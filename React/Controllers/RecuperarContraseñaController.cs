using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API_Ejemplo.Model;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarContraseñaController : ControllerBase
    {

        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;


        // GET: api/RecuperarContraseña
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/RecuperarContraseña/5
        [HttpGet("{id}", Name = "correo")]
        public void Get(string email1, string email2)
        {
          
            
        }

        // POST: api/RecuperarContraseña
        [HttpPost]
        public void RecuperarContraseña(Correo correo)
        {

            if (correo.email1.Equals(correo.email2))
            {

                Conexion conexionString = new Conexion();
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerIdPorCorreo", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@correo", correo.email1);
                dataReader = cmd.ExecuteReader();
                int partyId = 0;
                while (dataReader.Read())
                {
                  
                    int.TryParse(dataReader["PartyFk"].ToString(), out partyId);
                }
                conexion.Close();


                if (partyId != 0)
                {

                    Password password = new Password();
                    string simplePassword = password.Generate();
                    string encryPassword = password.GetMD5(simplePassword);

                    conexion.Open();
                    cmd = new SqlCommand("Proc_RecuperarContrasena", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", partyId);
                    cmd.Parameters.AddWithValue("@contraseña", encryPassword);
                    dataReader = cmd.ExecuteReader();
                    conexion.Close();

                    string mailRecovery = correo.email1;
                    string body = "Anderson Security le remite los datos solicitados" +
                    "\n\n" +
                                  "Clave de acceso: " + simplePassword +
                    "\n\n" +
                    "Por su seguridad no mantenga esta información al alcance de otras personas." +
                    "\n\n" +
                    "Ingresar al sitio web: http://localhost:58055/";
                    string subject = "Recuperación de contraseña";
                    List<string> mailList = new List<string>();
                    mailList.Add(mailRecovery);

                    new EnviarCorreo().enviarCorreo(mailList, subject, body);
                }


                //new EnviarCorreo().enviarCorreo(mailList, subject, body);



                //return CreatedAtRoute("Get", new { id = value.PARTYID }, value);
                //}
                //    else
                //    {

                //    }
            }
        }

        // PUT: api/RecuperarContraseña/5
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
