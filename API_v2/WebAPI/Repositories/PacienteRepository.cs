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
            try
            {
                return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao!.Situacao == "Agendada").ToList();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> BuscarCanceladas(Guid Id)
        {
            try
            {
                return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao!.Situacao == "Cancelada").ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Consulta> BuscarRealizadas(Guid Id)
        {
            try
            {
                return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao!.Situacao == "Realizada").ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
            try
            {
                return ctx.Consultas
                 .Include(x => x.Situacao)
                 .Include(x => x.Prioridade)
                 .Include(x => x.MedicoClinica!.Medico!.IdNavigation)   
                 .Include(x => x.MedicoClinica!.Medico!.Especialidade)
                 .Include (x => x.MedicoClinica!.Consulta)
                 // diferença em dias entre a Data da Consulta e a dataConsulta é igual a 0.
                 .Where(x => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                 .ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Paciente BuscarPorId(Guid Id)
        {
            try
            {
                return ctx.Pacientes
                .Include(x => x.IdNavigation)
                .Include(x => x.Endereco)
                .FirstOrDefault(x => x.Id == Id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario user)
        {
            try
            {
                user.Senha = Criptografia.GerarHash(user.Senha!);
                ctx.Usuarios.Add(user);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
