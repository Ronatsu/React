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
    public class PromedioTiempoContineciaDescubrimientoMesController : ControllerBase
    {

        // Variables de conexión
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<IncidenciaMes> incidencias = new List<IncidenciaMes>();
        JSON HandleError = new JSON();

        // GET: api/PromedioTiempoContineciaDescubrimientoMes
        [HttpGet]
        [Route("ObtenerPromTiempoContiDesc")]
        public ActionResult<List<IncidenciaMes>> Get()
        {
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_PromedioTiempoContinenciaDescubrimiento", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                    nuevaIncidencia.Mes = dataReader["MesIncidencia"].ToString();
                    nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["HorasMes"].ToString());

                    incidencias.Add(nuevaIncidencia);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = incidencias;
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }
        public void EstablecerConexion()
        {
            conexion = new SqlConnection(new Conexion().getConnection());
            conexion.Open();
        }

        public void CerrarConexion()
        {
            conexion.Close();
        }
    }
}
