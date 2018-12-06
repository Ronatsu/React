using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;

        // GET: api/User
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "List")]
        [Route("userList")]
        public ActionResult Get(int id)
        {
            Conexion conexionString = new Conexion();
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            cmd = new SqlCommand("Proc_ObtenerParties", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            
            dataReader = cmd.ExecuteReader();
            List<Usuario> userList = new List<Usuario>();
            while (dataReader.Read())
            {

                Usuario newUser = new Usuario();
                newUser.PARTYID = dataReader["PartyId"].ToString();
                newUser.NOMBRE = dataReader["Nombre"].ToString();
                newUser.PRIMER_APELLIDO = dataReader["PrimerApellido"].ToString();
                newUser.SEGUNDO_APELLIDO = dataReader["SegundoApellido"].ToString();
                newUser.ROL_USUARIO = dataReader["RolUsuario"].ToString();
                newUser.correoElectronico = dataReader["Correo"].ToString();

                userList.Add(newUser);
            }
            conexion.Close();
            var item = userList;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST: api/User
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/User/5
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
