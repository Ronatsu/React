using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoIncidenciaController : ControllerBase
    {
        //String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
        //                          "Initial Catalog=ProyectoAnderson;" +
        //                          "Integrated security=True;";

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        

        // GET: api/TipoIncidencia
        [HttpGet]
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

        // GET: api/TipoIncidencia/5
        [HttpGet("{id}", Name = "GetTipoIncidencia")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/TipoIncidencia
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
