using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {

        public VitalContext ctx = new VitalContext();

        public Consulta BuscarPorId(Guid id)
        {
            return ctx.Consultas.Find(id);
        }

        public void Cadastrar(Consulta clinica)
        {
            ctx.Consultas.Add(clinica);
            ctx.SaveChanges();
        }

        public void EditarProntuario(PatchConsultaViewModel consultaViewModel, Guid idConsulta)
        {
            Consulta buscada = ctx.Consultas.Find(idConsulta)!;

            buscada.Descricao = consultaViewModel.Descricao;
            buscada.Diagnostico = consultaViewModel.Diagnostico;
            ctx.Update(buscada);
            ctx.SaveChanges();
        }

        public void EditarStatus(Guid idConsulta, Guid idSituacao)
        {
            Consulta buscada = ctx.Consultas.Find(idConsulta);

            if (buscada != null)
            {
                buscada.SituacaoId = idSituacao;
                ctx.Update(buscada);
                ctx.SaveChanges();
            }
        }


        public List<Consulta> ListarPorMedico(Guid IdMedico)
        {
            
            List<Consulta> listaConsultas = ctx.Consultas
                .Include(x => x.MedicoClinica)
                .Where(x => x.MedicoClinica != null && x.MedicoClinica.MedicoId == IdMedico)
                .ToList();

            return listaConsultas;
            
        }

        public List<Consulta> ListarPorPaciente(Guid IdPaciente)
        {
            List<Consulta> listaConsultas = ctx.Consultas
                .Include(x => x.MedicoClinica)
                .Include(x => x.Paciente)
                .Where(x => x.PacienteId != null && x.PacienteId == IdPaciente)
                .ToList();

            return listaConsultas;
        }

        public List<Consulta> ListarTodos()
        {
            return ctx.Consultas.ToList();
        }
    }
}
