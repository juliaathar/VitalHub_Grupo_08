using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IMedicoRepository
    {
        public List<Medico> ListarTodos();
        public Medico BuscarPorId(Guid Id);
        public void CadastrarMedico(Usuario medico);

        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico);
    }
}
