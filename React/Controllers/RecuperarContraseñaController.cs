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
          
            //if (email1.Equals(email2))
            //{
                string mailRecovery = "";

                Conexion conexionString = new Conexion();
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
            cmd = new SqlCommand("f_ExisteCorreo", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@correo", email1);
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                mailRecovery = dataReader["CorreoElectronico"].ToString();
            }

            conexion.Close();

                string body = "Anderson Security le remite los datos solicitados\n" +
                    "Clave de acceso: 123456" +
                    "\n" +
                    "Por su seguiridad no mantenga esta información al alcance de otras personas";
                string subject = "Recuperaci";
                List<string> mailList = new List<string>();
                mailList.Add(mailRecovery);

                new EnviarCorreo().enviarCorreo(mailList,subject,body);


                //return CreatedAtRoute("Get", new { id = value.PARTYID }, value);
            //}
            //else
            //{

            //}
        }

        // POST: api/RecuperarContraseña
        [HttpPost]
        public void RecuperarContraseña(string email1, string email2)
        {
            email1 = "cesar.jimenez@ucrso.info";
            if (email1.Equals(email1))
            {
                string mailRecovery = "";

            Conexion conexionString = new Conexion();
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            cmd = new SqlCommand("Proc_RecuperarContrasena", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@correo", email1);
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                mailRecovery = dataReader["CorreoElectronico"].ToString();
            }

            conexion.Close();

            string body = "Anderson Security le remite los datos solicitados\n" +
                "Clave de acceso: 123456" +
                "\n" +
                "Por su seguiridad no mantenga esta información al alcance de otras personas";
            string subject = "Recuperaci";
            List<string> mailList = new List<string>();
            mailList.Add(mailRecovery);

            new EnviarCorreo().enviarCorreo(mailList, subject, body);


            //return CreatedAtRoute("Get", new { id = value.PARTYID }, value);
        }
            else
            {

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
