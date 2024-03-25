using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IClinicaRepository
    {
        public void Cadastrar(Clinica clinica);

        public List<Clinica> ListarTodos();
        public List<Clinica> ListarPorEspecialidade(Guid especialidadeIds);


        public Clinica BuscarPorId(int id);
    }
}
