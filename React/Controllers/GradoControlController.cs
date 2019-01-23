using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GradoControlController : ControllerBase
    {

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;

        //manejo de errores
        JSON HandleError = new JSON();

        // GET: api/GradoControl
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            List<GradoControl> nuevaLista = new List<GradoControl>();
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ObtenerGradoControl", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    GradoControl gradoControl = new GradoControl();
                    gradoControl.Descrpcion = dataReader["GRADO_CONTROL"].ToString();
                    gradoControl.Id = Int32.Parse(dataReader["ID"].ToString());

                    nuevaLista.Add(gradoControl);
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
