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
    public class AreaAfectadaController : ControllerBase
    {
        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        //manejo de errores
        JSON HandleError = new JSON();


        // GET: api/AreaAfectada
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            List<Area> nuevaLista = new List<Area>();
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ObtenerArea", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Area AreaAfectada = new Area();
                    AreaAfectada.NombreArea = dataReader["NOMBRE_AREA"].ToString();
                    AreaAfectada.AreaID = dataReader["AREA_ID"].ToString();

                    nuevaLista.Add(AreaAfectada);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
        public void EstablecerConexion()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
        }
    }
}
