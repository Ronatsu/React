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
    public class TipoIncidenciaController : ControllerBase
    {

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;

        //manejo de errores
        JSON HandleError = new JSON();


        // GET: api/TipoIncidencia
        [HttpGet]
        [Route("GetTipos")]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_TipoIncidencia", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();

            List<TipoIncidencia> nuevaLista = new List<TipoIncidencia>();
            while (dataReader.Read())
            {
                TipoIncidencia tipoIncidencia = new TipoIncidencia();
                tipoIncidencia.Descripcion = dataReader["DESCRIPCION_INCIDENCIA"].ToString();
                tipoIncidencia.Id = Int32.Parse(dataReader["ID"].ToString());
                tipoIncidencia.Estado = dataReader["Estado"].ToString();

                nuevaLista.Add(tipoIncidencia);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet]
        [Route("GetEstados")]
        public ActionResult<List<string>> GetEstados()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ObtenerEstadoTipoIncidencia", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();

            List<MetaEstado> nuevaLista = new List<MetaEstado>();
            while (dataReader.Read())
            {
                MetaEstado estado = new MetaEstado();
                estado.Estado = dataReader["estado"].ToString();
                estado.Id = Int32.Parse(dataReader["ID"].ToString());

                nuevaLista.Add(estado);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }



        // POST: api/TipoIncidencia
        [HttpPost]
        [Route("ObtenerPorId")]
        public ActionResult<List<string>> ObtenerPorId(TipoIncidencia tipoIncidencia)
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ObtenerTipoIncidenciaPorId", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", tipoIncidencia.Id);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                tipoIncidencia.Descripcion = dataReader["tipo"].ToString();
                tipoIncidencia.Estado = dataReader["estado"].ToString();
            }
            conexion.Close();
            var item = tipoIncidencia;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("AgregarTipo")]
        public ActionResult<List<string>> AgregarTipo(TipoIncidencia tipoIncidencia)
        {
            if (!tipoIncidencia.Descripcion.Equals(""))
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ExisteTipoInicidencia", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@tipoIncidencia", tipoIncidencia.Descripcion);


                dataReader = cmd.ExecuteReader();
                int id = 0;
                while (dataReader.Read())
                {
                    int.TryParse(dataReader["ID"].ToString(), out id);
                    tipoIncidencia.Id = id;
                }
                conexion.Close();

                if (id == 0)
                {
                    EstablecerConexion();
                    cmd = new SqlCommand("Proc_AgregarTipoInicidencia", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@tipoIncidencia", tipoIncidencia.Descripcion);
                    cmd.Parameters.AddWithValue("@estado", tipoIncidencia.Estado);

                    dataReader = cmd.ExecuteReader();

                    conexion.Close();
                    return Ok();
                }
                return NotFound();
            }

            return NotFound();
        }


        [HttpPost]
        [Route("ModificarTipo")]
        public ActionResult<List<string>> ModificarTipo(TipoIncidencia tipoIncidencia)
        {
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ModificarTipoIncidencia", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", tipoIncidencia.Id);
                cmd.Parameters.AddWithValue("@tipo", tipoIncidencia.Descripcion);
                cmd.Parameters.AddWithValue("@estado", tipoIncidencia.Estado);

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

        public void EstablecerConexion()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
        }
    }
}
