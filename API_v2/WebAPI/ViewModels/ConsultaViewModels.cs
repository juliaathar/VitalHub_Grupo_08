namespace WebAPI.ViewModels
{
    public class ConsultaViewModels
    {
        public Guid SituacaoId { get; set; }
        public Guid PacienteId { get; set; }

        public Guid MedicoClinicaId { get; set; }
        public Guid PrioridadeId { get; set; }
        public DateTime DataConsulta { get; set; }
    }
}
