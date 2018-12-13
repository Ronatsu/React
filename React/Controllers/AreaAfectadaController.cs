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
    public class AreaAfectadaController : ControllerBase
    {
        //String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
        //                          "Initial Catalog=ProyectoAnderson;" +
        //                          "Integrated security=True;";
        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
       


        // GET: api/AreaAfectada
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ObtenerArea", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            List<Area> nuevaLista = new List<Area>();
            while (dataReader.Read())
            {
                Area AreaAfectada = new Area();
                AreaAfectada.NombreArea = dataReader["NOMBRE_AREA"].ToString();
                AreaAfectada.AreaID = dataReader["ID"].ToString();

                nuevaLista.Add(AreaAfectada);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // GET: api/AreaAfectada/5
        [HttpGet("{id}", Name = "GetAreaAfectada")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AreaAfectada
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/AreaAfectada/5
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
