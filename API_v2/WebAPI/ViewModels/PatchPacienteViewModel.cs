namespace WebAPI.ViewModels
{
    public class PatchPacienteViewModel
    {
        public string? Cpf { get; set; }
        public DateTime? DataNascimento { get; set; }
        public EnderecoViewModel? NovoEndereco { get; set; }

    }
}
