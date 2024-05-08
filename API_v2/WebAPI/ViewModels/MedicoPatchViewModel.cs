using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.ViewModels
{
    public class MedicoPatchViewModel
    {


        public string? Cep { get; set; }

        public string? Logradouro { get; set; }
        public string? Cidade { get; set; }

        public int? Numero { get; set; }

    }
}
