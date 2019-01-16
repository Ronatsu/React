using System;
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
    public class GetIncidentsController : ControllerBase
    {
        string ConnectionString = new Conexion().getConnection();
        SqlConnection Connection;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<DataIncidents> ListIncidents = new List<DataIncidents>();
        List<Correo> ListStateIncident = new List<Correo>();

        //manejo de errores
        JSON HandleError = new JSON();


        [HttpPost]
        [Route("MethodGetIncidents")]
        public ActionResult<List<DataIncidents>> GetIncidents(Correo correo)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                if (Int32.Parse(correo.email2) == 0)
                {
                    cmd = new SqlCommand("Proc_ObtenerIncidenciadSinEstado", Connection);
                }
                else
                {
                    cmd = new SqlCommand("Proc_ObtenerIncidencia", Connection);
                    cmd.Parameters.AddWithValue("@ESTADO_ID", correo.email2);
                }
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PARTY_ID", correo.email1);
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    DataIncidents incidents = new DataIncidents();
                    incidents.ImpactProbability = dataReader["ProbabilidadImpacto"].ToString();
                    incidents.Description = dataReader["Descripcion"].ToString();
                    incidents.ImpactType = dataReader["TipoImpacto"].ToString();
                    incidents.DateIncident = DateTime.Parse(dataReader["FechaInicidencia"].ToString()).ToString("G");
                    incidents.IdIncidencia = Int32.Parse(dataReader["IncidenciaId"].ToString());
                    incidents.Estado = Int32.Parse(dataReader["EstadoFk"].ToString());

                    ListIncidents.Add(incidents);
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
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
            }

            var item = ListStateIncident;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
        [HttpPost]
        [Route("MethodInsertStep")]
        public ActionResult InsertSteps(DataIncidents stepData)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_InsertarPasos", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Descripcion", stepData.Description);
                cmd.Parameters.AddWithValue("@IncidenciaFk", stepData.IdIncidencia);
                dataReader = cmd.ExecuteReader();
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        [Route("GetInformationIncident")]
        public ActionResult InformationIncident(IncidentInformation incidentInfo)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_InformacionIncidencia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@INCIDENCIA_ID", incidentInfo.IncidenciaID);
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    incidentInfo.TipoIncidencia = dataReader["TipoIncidencia"].ToString();
                    incidentInfo.MetaEstado = dataReader["MetaEstado"].ToString();
                    incidentInfo.FechaInicidencia = DateTime.Parse(dataReader["FechaInicidencia"].ToString()).ToString("G");
                    incidentInfo.TipoImpacto = dataReader["TipoImpacto"].ToString();
                    incidentInfo.NombreCompleto = dataReader["NombreCompleto"].ToString();
                    incidentInfo.GradoControl = dataReader["GradoControl"].ToString();
                    incidentInfo.Descripcion = dataReader["Descripcion"].ToString();

                }
                Connection.Close();
                incidentInfo.AreaData = GetAreaData(incidentInfo.IncidenciaID);
                incidentInfo.StepsData = GetStepsById(incidentInfo.IncidenciaID);
                incidentInfo.TecnologiaData = GetTecnologiaData(incidentInfo.IncidenciaID);
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = incidentInfo;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        private List<string> GetAreaData(int idIncident)
        {
            List<string> areaData = new List<string>();

            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_InformacionAreaPorId", Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@INCIDENCIA_ID", idIncident);
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                areaData.Add(dataReader["NombreArea"].ToString());
            }
            Connection.Close();
            return areaData;
        }

        private List<string> GetTecnologiaData(int idIncident)
        {
            List<string> areaData = new List<string>();

            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_InformacionTecnologiaPorId", Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@INCIDENCIA_ID", idIncident);
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                areaData.Add(dataReader["NombreTecnologia"].ToString());
            }
            Connection.Close();
            return areaData;
        }

        private List<TipoIncidencia> GetStepsById(int idIncident)
        {
            List<TipoIncidencia> ListStepData = new List<TipoIncidencia>();

            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_ObtenerPasosPorId", Connection);
            cmd.Parameters.AddWithValue("@IncidenciaFk", idIncident);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            TipoIncidencia stepData = new TipoIncidencia();
            while (dataReader.Read())
            {
                stepData.Descripcion = dataReader["Descripcion"].ToString();
                stepData.Estado = dataReader["MetaEstado"].ToString();
                ListStepData.Add(stepData);
            }
            Connection.Close();
            return ListStepData;
        }
    }
}
