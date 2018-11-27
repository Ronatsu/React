using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {


        // GET: api/Mail/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Mail
        [HttpPost]
        public void Post([FromBody] string mail)
        {
            String gg = mail;
            Console.WriteLine("Press any key to exit. " + mail);
            Console.ReadKey();
        }
    }
}
