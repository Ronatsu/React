using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetIncidentsController : ControllerBase
    {
        string ConnectionString = new Conexion().getConnection();
        SqlConnection Connection;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<DataIncidents> ListIncidents = new List<DataIncidents>();
        // GET: api/GetIncidents
        [HttpGet]
        [Route("MethodGetIncidents")]
        public ActionResult<List<DataIncidents>> Get()
        {
            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("ObtenerIncidencia", Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PARTY_ID", 2);
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                DataIncidents incidents = new DataIncidents();
                incidents.ImpactProbability = dataReader["ProbabilidadImpacto"].ToString();
                incidents.Description = dataReader["Descripcion"].ToString();
                incidents.ImpactType = dataReader["TipoImpacto"].ToString();
                incidents.DateIncident = DateTime.Parse(dataReader["FechaInicidencia"].ToString());

                ListIncidents.Add(incidents);

            }
            Connection.Close();
            var item = ListIncidents;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
    }
}
