using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidenciaController : ControllerBase
    {

        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;

        // GET: api/Incidencia
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Incidencia/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Incidencia
        [HttpPost]
        public void addIncident(Incident newIncident)
        {

            conexion = new SqlConnection(new Conexion().getConnection());
            conexion.Open();
            cmd = new SqlCommand("Proc_AgregarIncidencia", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FechaDescubrimiento", newIncident.FechaDescubrimiento);
            cmd.Parameters.AddWithValue("@TipoIncidenciaFk", newIncident.TipoIncidencia);
            cmd.Parameters.AddWithValue("@TipoImpactoFk", newIncident.TipoImpacto);
            cmd.Parameters.AddWithValue("@MetodoDeteccionFk", newIncident.MetodoDeteccion);
            cmd.Parameters.AddWithValue("@GradoControlFk", newIncident.GradoControl);
            cmd.Parameters.AddWithValue("@Descripcion", newIncident.Descripcion);
            cmd.Parameters.AddWithValue("@AreaAfectada", newIncident.AreaAfectada);

            dataReader = cmd.ExecuteReader();
            
            conexion.Close();
            
                
           

            //return CreatedAtRoute("Get", new { id = newIncident.PARTYID }, newIncident);
        }

        // PUT: api/Incidencia/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
