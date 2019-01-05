using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class JSONErrorController : ControllerBase
    {

        [HttpPost]
        public void AddJSON(JSONData data)
        {
            JSON saveJASON = new JSON();
            saveJASON.SaveDataError(data.Error, data.ErrorInfo);
        }

    }
}
