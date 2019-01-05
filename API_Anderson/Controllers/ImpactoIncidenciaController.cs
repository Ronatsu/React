using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ImpactoIncidenciaController : ControllerBase
    {
        //String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
        //                          "Initial Catalog=ProyectoAnderson;" +
        //                          "Integrated security=True;";
        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
       



        // GET: api/ImpactoIncidencia
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ImpactoIncidencia", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            List<TipoImpacto> nuevaLista = new List<TipoImpacto>();
            while (dataReader.Read())
            {
                TipoImpacto impacto = new TipoImpacto();
                impacto.Descripcion = dataReader["TIPO_IMPACTO"].ToString();
                impacto.Id = Int32.Parse(dataReader["ID"].ToString());

                nuevaLista.Add(impacto);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // GET: api/ImpactoIncidencia/5
        [HttpGet("{id}", Name = "GetImpacto")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ImpactoIncidencia
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ImpactoIncidencia/5
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
