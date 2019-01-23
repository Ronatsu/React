using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Model;
using API_Ejemplo.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {


        // Variables de conexión
        String connectionString = new Conexion().getConnection();
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
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
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
        [Route("ObtenerIncidenteCostoMes")]
        public ActionResult<List<IncidenciaMes>> GetCostoMes()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_CostoPromedioRecuperacionIncidente", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Mes"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["Costo"].ToString());

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
        [Route("ObtenerIncidenteRecAnno")]
        public ActionResult<List<IncidenciaMes>> GetRecuperacionAnno()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_CostoPromedioRecuperacionIncidenteAnno", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Mes"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["Costo"].ToString());

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
        [Route("ObtenerIncidenteHorAnno")]
        public ActionResult<List<IncidenciaMes>> GetHorasAnno()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_HorasIncidentesAnno", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["mesIncidencia"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["horasAnno"].ToString());

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
        [Route("ObtenerIncidenteIneterAnno")]
        public ActionResult<List<IncidenciaMes>> GetIncidentesInternosAnno()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesDetectadosInternosAnno", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Mes"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
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

        // GET: api/Reporte
        [HttpGet]
        [Route("ObtenerIncidenteTiemContAnno")]
        public ActionResult<List<IncidenciaMes>> GetTiempoContinenciaAnno()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_PromedioTiempoContinenciaDescubrimientoAnno", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["AnnoIncidencia"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["HorasAnno"].ToString());

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
        [Route("ObtenerIncidenteHorMes")]
        public ActionResult<List<IncidenciaMes>> GetHorMes()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_HorasIncidentesMes", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["mesIncidencia"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["horasMes"].ToString());

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
        [Route("ObtenerIncidentesAnno")]
        public ActionResult<List<IncidenciaMes>> GetIncidentesAnno()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesAnno", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Anno"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
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
        [Route("ObtenerIncidenteInternoMes")]
        public ActionResult<List<IncidenciaMes>> GetInternoMes()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesDetectadosInternos", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Mes"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
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

        // GET: api/Reporte
        [HttpGet]
        [Route("ObtenerPromTiempoContiDesc")]
        public ActionResult<List<IncidenciaMes>> GetTiempo()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_PromedioTiempoContinenciaDescubrimiento", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["MesIncidencia"].ToString();
                nuevaIncidencia.setValueMonth(nuevaIncidencia.Mes);
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["HorasMes"].ToString());

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
                //file.TipoIncidencia = dataReader["TipoIncidencia"].ToString();
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

        // GET: api/Reporte
        [HttpGet]
        [Route("ObtenerIncidenteHorSem")]
        public ActionResult<List<IncidenciaMes>> GetHorSem()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_HorasIncidentesSemana", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["semanaIncidencia"].ToString();
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["horasMes"].ToString());

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
        [Route("ObtenerIncidenteInterSem")]
        public ActionResult<List<IncidenciaMes>> GetInterSem()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesDetectadosInternosSemana", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["semanaIncidencia"].ToString();
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

        // GET: api/Reporte
        [HttpGet]
        [Route("ObtenerIncidenteSem")]
        public ActionResult<List<IncidenciaMes>> GetIncidentSem()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesSemana", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Semana"].ToString();
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
        [Route("ObtenerIncidenteContinenSem")]
        public ActionResult<List<IncidenciaMes>> GetContSem()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_PromedioTiempoContinenciaDescubrimientoSemana", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["semanaIncidencia"].ToString();
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["HorasMes"].ToString());

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
        [Route("ObtenerIncidenteHorTrim")]
        public ActionResult<List<IncidenciaMes>> GetHorTrim()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_HorasIncidentesTrimestre", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["trimestreIncidencia"].ToString();
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["horasMes"].ToString());

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
        [Route("ObtenerIncidenteInterTrim")]
        public ActionResult<List<IncidenciaMes>> GetInterTrim()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesDetectadosInternosTrimestre", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["trimestreIncidencia"].ToString();
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

        // GET: api/Reporte
        [HttpGet]
        [Route("ObtenerIncidenteTrim")]
        public ActionResult<List<IncidenciaMes>> GetInciTrim()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_IncidentesTrimestre", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["Trimestre"].ToString();
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
        [Route("ObtenerIncidenteContTrim")]
        public ActionResult<List<IncidenciaMes>> GetContTrim()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_PromedioTiempoContinenciaDescubrimientoTrimestre", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                IncidenciaMes nuevaIncidencia = new IncidenciaMes();
                nuevaIncidencia.Mes = dataReader["trimestreIncidencia"].ToString();
                nuevaIncidencia.CantidadIncidentes = Convert.ToInt32(dataReader["HorasMes"].ToString());

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
            conexion = new SqlConnection(connectionString);
            conexion.Open();
        }

        public void CerrarConexion()
        {
            conexion.Close();
        }
    }
}
