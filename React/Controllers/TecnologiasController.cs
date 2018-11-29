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
        String connectionString = "Data Source=LAPTOP-3NMBHTKN;" +
                                  "Initial Catalog=ProyectoAnderson;" +
                                  "Integrated security=True;";
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<string> nuevaLista = new List<string>();

        // GET: api/Tecnologias
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("STORED_OBTENER_TECNOLOGIA", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                TecnologiaModelo NuevaTecnologia = new TecnologiaModelo();
                NuevaTecnologia.TecnologiaId = int.Parse(dataReader["TECNOLOGIAID"].ToString());
                NuevaTecnologia.NombreTecnologia = dataReader["NOMBRE_TEC"].ToString();
                NuevaTecnologia.Critico_S_N = char.Parse(dataReader["CRITICO_SN"].ToString());
                NuevaTecnologia.TipoTecnologia_H_S = char.Parse(dataReader["TIPO_TEC"].ToString());

                nuevaLista.Add(NuevaTecnologia.NombreTecnologia);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return item;
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
            conexion = new SqlConnection(connectionString);
            conexion.Open();
        }
    }
}
