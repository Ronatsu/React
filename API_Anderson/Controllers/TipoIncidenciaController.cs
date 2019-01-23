using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TipoIncidenciaController : ControllerBase
    {
        
        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        

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
                TipoIncidencia tipoIncidencia=new TipoIncidencia();
                tipoIncidencia.Descripcion = dataReader["DESCRIPCION_INCIDENCIA"].ToString();
                tipoIncidencia.Id = Int32.Parse(dataReader["ID"].ToString());

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

        // PUT: api/TipoIncidencia/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public void EstablecerConexion()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
        }
    }
}
