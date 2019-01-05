using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GradoControlController : ControllerBase
    {
        //String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
        //                          "Initial Catalog=ProyectoAnderson;" +
        //                          "Integrated security=True;";

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
      

        // GET: api/GradoControl
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ObtenerGradoControl", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();

            List<GradoControl> nuevaLista = new List<GradoControl>();

            while (dataReader.Read())
            {
                GradoControl gradoControl = new GradoControl();
                gradoControl.Descrpcion = dataReader["GRADO_CONTROL"].ToString();
                gradoControl.Id = Int32.Parse( dataReader["ID"].ToString());

                nuevaLista.Add(gradoControl);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // GET: api/GradoControl/5
        [HttpGet("{id}", Name = "GetGradoControl")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GradoControl
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/GradoControl/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public void EstablecerConexion()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
        }
    }
}
