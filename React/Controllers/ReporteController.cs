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
    public class ReporteController : ControllerBase
    {


        // Variables de conexión
        String connectionString = "Data Source=DESKTOP-OR6ATOD\\SQLSERVER2017DEV;" +
                                  "Initial Catalog=ProyectoAnderson;" +
                                  "Integrated security=True;";
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<IncidenciaMes> incidencias = new List<IncidenciaMes>();
        List<CsvFile> csvList = new List<CsvFile>();


        // GET: api/Reporte
        [HttpGet]
        [Route("ObtenerIncidente")]
        public ActionResult<List<IncidenciaMes>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesMes", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Mes"].ToString();
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["CantidadIncidentes"].ToString());

                incidencias.Add(nuevaIncidencia);

            }
            conexion.Close();
            var item = incidencias;
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }


        // GET: api/Reporte
        [HttpGet]
        [Route("ObtenerCsv")]
        public ActionResult<List<CsvFile>> GetCsv()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_CsvDownload", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                CsvFile file = new CsvFile();
                file.Asignado = dataReader["Asignado"].ToString();
                file.FechaDescubrimiento = dataReader["FechaDescubrimiento"].ToString();
                file.FechaIncidencia = dataReader["FechaIncidencia"].ToString();
                file.FechaResuelto = dataReader["FechaResuelto"].ToString();
                file.FechaVerificacion = dataReader["FechaVerificacion"].ToString();
                file.MetaEstado = dataReader["MetaEstado"].ToString();
                file.TipoIncidencia = dataReader["TipoIncidencia"].ToString();
                file.TipoImpacto = dataReader["TipoImpacto"].ToString();
                file.Descripcion = dataReader["Descripcion"].ToString();
                file.MetodoDeteccion = dataReader["MetodoDeteccion"].ToString();


                csvList.Add(file);

            }
            conexion.Close();
            var item = csvList;
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
