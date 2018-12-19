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
        private int Id = 0;
        string ConnectionString = new Conexion().getConnection();
        SqlConnection Connection;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<DataIncidents> ListIncidents = new List<DataIncidents>();



       


        [HttpPost]
        [Route("MethodGetIncidents")]
        public ActionResult<List<DataIncidents>> Get(Correo correo)
        {
            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_ObtenerIncidencia", Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PARTY_ID", correo.email1);
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                DataIncidents incidents = new DataIncidents();
                incidents.ImpactProbability = dataReader["ProbabilidadImpacto"].ToString();
                incidents.Description = dataReader["Descripcion"].ToString();
                incidents.ImpactType = dataReader["TipoImpacto"].ToString();
                incidents.DateIncident = Convert.ToDateTime(dataReader["FechaInicidencia"]).ToString("dd/MM/yyyy");
                // incidents.DateIncident = DateTime.Parse(dataReader["FechaInicidencia"].ToString()).ToString("G");

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
