using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImpactoIncidenciaController : ControllerBase
    {
        String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
                                  "Initial Catalog=ProyectoAnderson;" +
                                  "Integrated security=True;";
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<string> nuevaLista = new List<string>();



        // GET: api/ImpactoIncidencia
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("STORED_OBTENER_IMPACTO_INSIDENCIA", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                String ImpactoIncidencia = "";
                ImpactoIncidencia = dataReader["NOMBRE_IMPACTO"].ToString();

                nuevaLista.Add(ImpactoIncidencia);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // GET: api/ImpactoIncidencia/5
        [HttpGet("{id}", Name = "GetImpacto")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ImpactoIncidencia
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ImpactoIncidencia/5
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
            conexion = new SqlConnection(connectionString);
            conexion.Open();
        }
    }
}
