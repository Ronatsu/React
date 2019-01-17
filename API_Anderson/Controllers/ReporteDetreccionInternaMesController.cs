using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReporteDetreccionInternaMesController : ControllerBase
    {

        // Variables de conexión
        String connectionString = "Data Source=DESKTOP-OR6ATOD\\SQLSERVER2017DEV;" +
                                  "Initial Catalog=ProyectoAnderson;" +
                                  "Integrated security=True;";
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<IncidenciaMes> incidencias = new List<IncidenciaMes>();



        // GET: api/ReporteDetreccionInternaMes
        [HttpGet]
        [Route("ObtenerIncidenteInternoMes")]
        public ActionResult<List<IncidenciaMes>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesDetectadosInternos", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Mes"].ToString();
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["DeteccionInterna"].ToString());

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
