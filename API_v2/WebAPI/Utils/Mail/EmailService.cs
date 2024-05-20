
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {

        //variave privada com as configs do email 
        private readonly EmailSettings emailSettings;
        public EmailService(IOptions<EmailSettings> options)
        {
            //obtem as configs do email e armazena na variavel privada
            emailSettings = options.Value;
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //objeto que representa o email 
                var email = new MimeMessage();

                //define o remetente do email 
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //adiciona o destinatario do email 
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //define o assunto do email 
                email.Subject = mailRequest.Subject;

                //cria o corpo do email
                var builder = new BodyBuilder();

                //define o corpo do email como html
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no objeto MimeMessage
                email.Body = builder.ToMessageBody();

                using (var smtp = new SmtpClient()) {
                    smtp.Connect(emailSettings.Host, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);

                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    await smtp.SendAsync(email);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
