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
        List<Correo> ListStateIncident = new List<Correo>();
        JSON HandleError = new JSON();


        [HttpPost]
        [Route("MethodGetIncidents")]
        public ActionResult<List<DataIncidents>> GetIncidents(Correo correo)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_ObtenerIncidencia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PARTY_ID", correo.email1);
                cmd.Parameters.AddWithValue("@ESTADO_ID", correo.email2);
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    DataIncidents incidents = new DataIncidents();
                    incidents.ImpactProbability = dataReader["ProbabilidadImpacto"].ToString();
                    incidents.Description = dataReader["Descripcion"].ToString();
                    incidents.ImpactType = dataReader["TipoImpacto"].ToString();
                    incidents.DateIncident = DateTime.Parse(dataReader["FechaInicidencia"].ToString()).ToString("G");

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

        [HttpGet]
        [Route("MethodGetStateIncident")]
        public ActionResult<List<Correo>> GetStateIncident()
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_StateIncident", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Correo incidents = new Correo();
                    incidents.email1 = dataReader["MetaEstado"].ToString();
                    incidents.email2 = dataReader["MetaEstadoId"].ToString();

                    ListStateIncident.Add(incidents);
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                throw;
            }

            var item = ListStateIncident;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
    }
}
