namespace WebAPI.ViewModels
{
    public class PatchPacienteViewModel
    {
        public string? Rg { get; set; }
        public string? Cpf { get; set; }
        public DateTime? DataNascimento { get; set; }
        public EnderecoViewModel? NovoEndereco { get; set; }

    }
}
