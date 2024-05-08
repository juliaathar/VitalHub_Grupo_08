namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {

        //destinatario
        public string? ToEmail { get; set; }
        //assunto 
        public string? Subject { get; set; }
        //corpo
        public string? Body { get; set; }
    }
}
