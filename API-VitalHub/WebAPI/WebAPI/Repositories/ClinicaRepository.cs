using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        VitalContext _context = new VitalContext();

        public void Cadastrar(Clinica clinica)
        {
            _context.Clinicas.Add(clinica);
            _context.SaveChanges();
        }

        public List<Clinica> ListarTodos()
        {
            return _context.Clinicas.ToList();
        }

        public List<Clinica> ListarPorEspecialidade(Guid especialidadeId)
        {
            var clinicasComEspecialidade = _context.Clinicas
                .Include(c => c.MedicosClinicas)
                .ThenInclude(mc => mc.Medico)
                .Where(c => c.MedicosClinicas.Any(mc => mc.Medico.EspecialidadeId == especialidadeId))
                .ToList();

            return clinicasComEspecialidade;
        }


        public Clinica BuscarPorId(int id)
        {
            return _context.Clinicas!.Find(id);
        }
    }
}
