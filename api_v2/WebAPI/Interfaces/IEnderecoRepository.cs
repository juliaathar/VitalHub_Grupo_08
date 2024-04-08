using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IEnderecoRepository
    {
        public void Cadastrar(EnderecoViewModel endereco);
        public List<Endereco> Listar();
    }
}
