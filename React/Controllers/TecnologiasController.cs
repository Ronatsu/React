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

namespace API_Ejemplo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TecnologiasController : ControllerBase
    {

        // Variables de conexión
        //String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
        //                          "Initial Catalog=ProyectoAnderson;" +
        //                          "Integrated security=True;";

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        JSON HandleError = new JSON();

        // GET: api/Tecnologias
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            List<TecnologiaModelo> nuevaLista = new List<TecnologiaModelo>();
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_NombreTecnologia", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    TecnologiaModelo NuevaTecnologia = new TecnologiaModelo();
                    NuevaTecnologia.NombreTecnologia = dataReader["NOMBRE_TEC"].ToString();
                    NuevaTecnologia.TecnologiaId = Int32.Parse(dataReader["id"].ToString());

                    nuevaLista.Add(NuevaTecnologia);

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
