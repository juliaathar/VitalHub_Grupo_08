﻿using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IPacienteRepository
    {
        public void Cadastrar(Usuario paciente);
        public Paciente BuscarPorId(Guid Id);
        public Paciente AtualizarPerfil(Guid id, PatchPacienteViewModel pacientePatch);

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id);
    }
}
