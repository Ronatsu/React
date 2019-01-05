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
    public class GetIncidentsController : ControllerBase
    {
        string ConnectionString = new Conexion().getConnection();
        SqlConnection Connection;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<DataIncidents> ListIncidents = new List<DataIncidents>();
        JSON HandleError = new JSON();


        [HttpPost]
        [Route("MethodGetIncidents")]
        public ActionResult<List<DataIncidents>> GetIncidents(Correo correo)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("ObtenerIncidencia", Connection);
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

                    ListIncidents.Add(incidents);

                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                throw;
            }

            var item = ListIncidents;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
    }
}
