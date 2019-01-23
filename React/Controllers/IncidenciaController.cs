using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class IncidenciaController : ControllerBase
    {
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        JSON HandleError = new JSON();

        [HttpGet]
        [Route("IncidenciasSinAsignar")]
        public ActionResult<List<DataIncidents>> Get()
        {
            List<Incidencia> ListIncidents = new List<Incidencia>();
            try
            {
                conexion = new SqlConnection(new Conexion().getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerIncidenciaSinAsignar", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Incidencia incident = new Incidencia();
                    incident.Id = Int32.Parse(dataReader["id"].ToString());
                    incident.ProbabilidaImpacto = dataReader["ProbabilidadImpacto"].ToString();
                    incident.Descripcion = dataReader["Descripcion"].ToString();
                    incident.TipoImpacto = dataReader["TipoImpacto"].ToString();
                    incident.FechaIncidencia = Convert.ToDateTime(dataReader["FechaInicidencia"]).ToString("G");


                    ListIncidents.Add(incident);

                }

                conexion.Close();
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
        [Route("ObtenerEstados")]
        public ActionResult<List<Correo>>ObtenerEstados()
        {
            List<Correo> lista = new List<Correo>();

            try
            {
                conexion = new SqlConnection(new Conexion().getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerEstados", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Correo incidents = new Correo();
                    incidents.email1 = dataReader["MetaEstado"].ToString();
                    incidents.email2 = dataReader["MetaEstadoId"].ToString();

                    lista.Add(incidents);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }

            var item = lista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }


        [HttpPost]
        [Route("ObtenerIncidenciasCreadasPor")]
        public ActionResult<List<DataIncidents>> ObtenerIncidenciasCreadasPor(Correo correo)
        {
            List<Incidencia> ListIncidents = new List<Incidencia>();
            try
            {
                conexion = new SqlConnection(new Conexion().getConnection());
                conexion.Open();
                if (Int32.Parse(correo.email2) == 0)
                {
                    cmd = new SqlCommand("Proc_ObtenerIncidenciasCreadasPor", conexion);
                }
                else
                {
                    cmd = new SqlCommand("Proc_ObtenerIncidenciasCreadasPorConEstado", conexion);
                    cmd.Parameters.AddWithValue("@ESTADO", correo.email2);
                }
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", correo.email1);
                dataReader = cmd.ExecuteReader();


                while (dataReader.Read())
                {
                    Incidencia incidents = new Incidencia();
                    incidents.ProbabilidaImpacto = dataReader["ProbabilidadImpacto"].ToString();
                    incidents.Descripcion = dataReader["Descripcion"].ToString();
                    incidents.TipoImpacto = dataReader["TipoImpacto"].ToString();
                    incidents.FechaIncidencia = DateTime.Parse(dataReader["FechaInicidencia"].ToString()).ToString("G");
                    incidents.Id = Int32.Parse(dataReader["IncidenciaId"].ToString());
                    incidents.EstadoFk = dataReader["EstadoFk"].ToString();
                    incidents.Estado = dataReader["Estado"].ToString();

                    ListIncidents.Add(incidents);
                }
                conexion.Close();
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
    


        // POST: api/Incidencia
        [HttpPost]
        [Route("AddIncident")]
        public void AddIncident(Incidencia incidencia)
        {
            try
            {
                conexion = new SqlConnection(new Conexion().getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_AgregarIncidencia", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FechaDescubrimiento", incidencia.FechaDescubrimiento);
                cmd.Parameters.AddWithValue("@TipoIncidenciaFk", incidencia.TipoIncidencia);
                cmd.Parameters.AddWithValue("@TipoImpactoFk", incidencia.TipoImpacto);
                cmd.Parameters.AddWithValue("@MetodoDeteccionFk", incidencia.MetodoDeteccion);
                cmd.Parameters.AddWithValue("@GradoControlFk", incidencia.GradoControl);
                cmd.Parameters.AddWithValue("@Descripcion", incidencia.Descripcion);
                cmd.Parameters.AddWithValue("@AreaAfectada", incidencia.AreaAfectada);
                cmd.Parameters.AddWithValue("@probabilidad", incidencia.ProbabilidaImpacto);

                dataReader = cmd.ExecuteReader();

                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
        }

        [HttpPost]
        [Route("RechazarIncidencia")]
        public ActionResult<List<string>> RechazarIncidencia(Incidencia incidencia)
        {
            try
            {
                conexion = new SqlConnection(new Conexion().getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_RechazarIncidencia", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", incidencia.Id);
                

                dataReader = cmd.ExecuteReader();

                conexion.Close();

                return Ok();
            }
            catch (Exception ex)
            {
                
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }


        [HttpPost]
        [Route("AsignarIncident")]
        public void AsignarIncident(Usuario usuarios)
        {

            conexion = new SqlConnection(new Conexion().getConnection());

            string mailRecovery;

            List<string> mailList = new List<string>();
            try
            {
                foreach (var item in usuarios.AsignacionArray)
                {
                    if (item.Add)
                    {
                        conexion.Open();
                        cmd = new SqlCommand("Proc_AsignarIncidencia", conexion);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@partyiD", item.Partyid);
                        cmd.Parameters.AddWithValue("@incidenciaId", usuarios.email);
                        cmd.Parameters.AddWithValue("@DueñoAsignacionID", 2);   
                        dataReader = cmd.ExecuteReader();
                        conexion.Close();

                        conexion.Open();
                        cmd = new SqlCommand("Proc_ObtenerCorreoPorId", conexion);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", item.Partyid);
                        dataReader = cmd.ExecuteReader();
                        while (dataReader.Read())
                        {

                            mailRecovery = dataReader["ValorMecanismo"].ToString();
                            mailList.Add(mailRecovery);
                        }

                        conexion.Close();

                    }
                }

                if (mailList.Count != 0)
                {
                    string body = "Se ha registrado una nueva incidencia y ha sido asignada a su persona." +
                   "\nPara darle seguimiento diríjase al sitio web: http://localhost:44372/";
                    string subject = "Nueva asignación";
                    new EnviarCorreo().enviarCorreo(mailList, subject, body);
                }
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
        }
    }
}
