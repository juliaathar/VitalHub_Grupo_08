using WebAPI.Domains;

namespace WebAPI.ViewModels
{
    public class PatchConsultaViewModel
    {
        Guid id { get; set; }
        SituacaoConsulta? situacao {  get; set; }
    }
}
