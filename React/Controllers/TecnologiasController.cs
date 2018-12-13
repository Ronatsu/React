using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        

        // GET: api/Tecnologias
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_NombreTecnologia", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();

            List<TecnologiaModelo> nuevaLista = new List<TecnologiaModelo>();
            while (dataReader.Read())
            {
                TecnologiaModelo NuevaTecnologia = new TecnologiaModelo();
                NuevaTecnologia.NombreTecnologia = dataReader["NOMBRE_TEC"].ToString();
                NuevaTecnologia.TecnologiaId = Int32.Parse(dataReader["id"].ToString());

                nuevaLista.Add(NuevaTecnologia);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // GET: api/Tecnologias/5
        [HttpGet("{id}", Name = "GetTecno")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Tecnologias
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Tecnologias/5
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
