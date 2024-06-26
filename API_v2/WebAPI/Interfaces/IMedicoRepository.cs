﻿using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IMedicoRepository
    {
        public List<Medico> ListarTodos();
        public Medico BuscarPorId(Guid Id);
        public Medico AtualizarPerfil(Guid Id, MedicoPatchViewModel medico);
        public void Cadastrar(Usuario medico);
        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id);

        public List<Medico> ListarPorClinica(Guid id);
    }
}
