using WebAPI.Domains;

namespace WebAPI.ViewModels
{
    public class PatchConsultaViewModel
    {
        public string? Descricao { get; set; }
        public string? Diagnostico { get; set; }
        public virtual Receita? Receita { get; set; }

    }
}
