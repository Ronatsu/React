using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

namespace React.Model
{
    public class EnviarCorreo
    {

        public void enviarCorreo(List<string> listMails, string subject,string body) {

            MailMessage mail = new MailMessage
            {
                From = new MailAddress("anderson.impesa@gmail.com"),
                Subject = subject,
                Body = body
            }; foreach (var destinatario in listMails)
            {
                mail.To.Add(new MailAddress(destinatario));
            }

            SmtpClient smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587, //25, 465; //587
              Credentials = new NetworkCredential("anderson.impesa@gmail.com", "impesa.2018"),
                EnableSsl = true
            };
            try
            {
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                throw new Exception("No se ha podido enviar el email", ex.InnerException);
            }
            finally
            {
                smtp.Dispose();
            }
        }

       
    }
}
