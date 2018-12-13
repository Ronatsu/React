using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JSONErrorController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }


        [HttpPost]
        public void AddJSON(JSONData data)
        {
            JSON saveJASON = new JSON();
            saveJASON.SaveDataError(data.Error, data.ErrorInfo);
        }

    }
}
