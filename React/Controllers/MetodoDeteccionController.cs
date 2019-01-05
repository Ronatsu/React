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
    public class MetodoDeteccionController : ControllerBase
    {
        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;



        // GET: api/MetodoDeteccion/5
        [Route("VerMetodos")]
        public ActionResult<List<string>> VerMetodos()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            cmd = new SqlCommand("Proc_ObtenerMetodoDeteccion", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            List<MetodoDeteccion> nuevaLista = new List<MetodoDeteccion>();
            while (dataReader.Read())
            {
                MetodoDeteccion metodo = new MetodoDeteccion();
                metodo.MetodoDeteccionNombre = dataReader["MetodoDeteccion"].ToString();
                metodo.Id = Int32.Parse(dataReader["ID"].ToString());

                nuevaLista.Add(metodo);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST: api/MetodoDeteccion
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/MetodoDeteccion/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
