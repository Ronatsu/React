using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MailController : ControllerBase
    {


        [HttpGet("[action]")]
        public void Get()
        {
            List<string> list = new List<string>
            {
                "kenneth.ugalde@ucrso.info",
                "ronald.alfarohidalgo@ucrso.info",
                "cesar.jimenez@ucrso.info"
            };

            MailMessage mail = new MailMessage
            {
                From = new MailAddress("ronald.alfarohidalgo@ucrso.info"),
                Subject = "Cordinacion de Informatica",
                Body = "Oferta de empleo en Intel, se necesita saber de React.js y Angular"
            };
            foreach (var destinatario in list)
            {
                mail.To.Add(new MailAddress(destinatario));
            }

            SmtpClient smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 25, //465; //587
                Credentials = new NetworkCredential("ronald.alfarohidalgo@ucrso.info", "contraseña"),
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
