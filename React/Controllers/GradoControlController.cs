using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradoControlController : ControllerBase
    {
        //String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
        //                          "Initial Catalog=ProyectoAnderson;" +
        //                          "Integrated security=True;";

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<string> nuevaLista = new List<string>();

        // GET: api/GradoControl
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ObtenerGradoControl", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                String AreaAfectada = "";
                AreaAfectada = dataReader["GRADO_CONTROL"].ToString();

                nuevaLista.Add(AreaAfectada);

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
