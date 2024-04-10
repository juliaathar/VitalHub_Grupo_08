using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        VitalContext ctx = new VitalContext();

        public Paciente AtualizarPerfil(Guid Id, PatchPacienteViewModel pacientePatch)
        {
            Paciente pacienteBuscado = ctx.Pacientes
                .Include(p => p.Endereco) // Certifique-se de incluir o Endereço
                .FirstOrDefault(x => x.Id == Id);

            if (pacienteBuscado != null)
            {
                if (pacientePatch.DataNascimento != null)
                    pacienteBuscado.DataNascimento = pacientePatch.DataNascimento;

                if (pacientePatch.NovoEndereco != null)
                {
                    if (pacientePatch.NovoEndereco.Cep != null)
                        pacienteBuscado.Endereco.Cep = pacientePatch.NovoEndereco.Cep;

                    if (pacientePatch.NovoEndereco.Logradouro != null)
                        pacienteBuscado.Endereco.Logradouro = pacientePatch.NovoEndereco.Logradouro;

                    if (pacientePatch.NovoEndereco.Numero != null)
                        pacienteBuscado.Endereco.Numero = pacientePatch.NovoEndereco.Numero;

                    if (pacientePatch.NovoEndereco.Cidade != null)
                        pacienteBuscado.Endereco.Cidade = pacientePatch.NovoEndereco.Cidade;

                }

                ctx.Pacientes.Update(pacienteBuscado);
                ctx.SaveChanges();

                return pacienteBuscado;
            }
            else
            {
                return null;
            }
        }


        public List<Consulta> BuscarAgendadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Agendada").ToList();
        }

        public List<Consulta> BuscarCanceladas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Cancelada").ToList();
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
           return ctx.Consultas
                .Include(x => x.Situacao)
                .Include(x => x.MedicoClinica!.Medico!.Especialidade)
                 .Include(x => x.Receita)
                //.Where(x  => x.PacienteId == idPaciente && x.DataConsulta == dataConsulta) 
                .Where(x => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                .ToList();
        }

        public Paciente BuscarPorId(Guid Id)
        {
            Paciente paciente = ctx.Pacientes
                .Include(p => p.IdNavigation)
                .FirstOrDefault(p => p.Id == Id);

            return paciente;
        }


        public List<Consulta> BuscarRealizadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Realizada").ToList();
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Criptografia.GerarHash(user.Senha!);
            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }
    }
}
