
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class EnderecoRepository : IEnderecoRepository
    {
        public VitalContext ctx = new VitalContext();
        public void Cadastrar(EnderecoViewModel enderecoViewModel)
        {

            var endereco = new Endereco
            {
                Cep = enderecoViewModel.Cep,
                Logradouro = enderecoViewModel.Logradouro,
                Numero = enderecoViewModel.Numero,
                Longitude = enderecoViewModel.Longitude,
                Latitude = enderecoViewModel.Latitude,
                Cidade = enderecoViewModel.Cidade

            };

            ctx.Enderecos.Add(endereco);

            ctx.SaveChanges();
        }

        public List<Endereco> Listar()
        {
            return ctx.Enderecos
                .Select(e => new Endereco
                {
                    Id = e.Id,
                    Cep = e.Cep,
                    Logradouro = e.Logradouro,
                    Numero = e.Numero,
                    Longitude = e.Longitude,
                    Latitude = e.Latitude,
                    Cidade = e.Cidade != null ? e.Cidade : "Cidade Desconhecida"
                })
                .ToList();
        }
    }
}
