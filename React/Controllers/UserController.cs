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
    public class UserController : ControllerBase
    {

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;

        // GET: api/User
        [HttpGet]
        [Route("UsuarioHabilitado")]
        public ActionResult GetUsuarioHabilitado()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            cmd = new SqlCommand("Proc_ObtenerUsuariosHabilitados", conexion);
            cmd.CommandType = CommandType.StoredProcedure;

            dataReader = cmd.ExecuteReader();
            List<Usuario> userList = new List<Usuario>();
            while (dataReader.Read())
            {

                Usuario newUser = new Usuario();
                newUser.PARTYID = dataReader["Id"].ToString();
                newUser.NOMBRE = dataReader["Nombre"].ToString();
                newUser.PRIMER_APELLIDO = dataReader["PrimerApellido"].ToString();
                newUser.SEGUNDO_APELLIDO = dataReader["SegundoApellido"].ToString();
                newUser.ROL_USUARIO = dataReader["Rol"].ToString();
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

        // GET: api/User/5
        [HttpGet]
        [Route("userList")]
        public ActionResult Get()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            cmd = new SqlCommand("Proc_ObtenerNewParties", conexion);
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

        [HttpPost]
        [Route("CambiarContraseña")]
        public ActionResult CambiarContraseña(Usuario party)
        {
            Password password = new Password();
            if (password.ValidarContrasena(party.password2, party.password1))
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                string s = password.GetMD5(party.passwordActual);

                cmd = new SqlCommand("Proc_CambiarContrasena", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", party.PARTYID);
                cmd.Parameters.AddWithValue("@constrasenaNueva", password.GetMD5(party.password1));
                cmd.Parameters.AddWithValue("@constrasenaActual",s);
                dataReader = cmd.ExecuteReader();

                conexion.Close();
            }

            
            return Ok();
        }

        [HttpPost]
        [Route("DarseDeBaja")]
        public ActionResult DarseDeBaja(Usuario party)
        {

                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();

                cmd = new SqlCommand("Proc_DarseDeBaja", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", party.PARTYID);
                dataReader = cmd.ExecuteReader();

                conexion.Close();
            


            return Ok();
        }

        [HttpPost]
        [Route("CambiarNombre")]
        public ActionResult CambiarNombre(Usuario party)
        {

            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();

            cmd = new SqlCommand("Proc_CambiarNombre", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", party.PARTYID);
            cmd.Parameters.AddWithValue("@nombre", party.NOMBRE);
            cmd.Parameters.AddWithValue("@primerApellido", party.PRIMER_APELLIDO);
            cmd.Parameters.AddWithValue("@segundoApellido", party.SEGUNDO_APELLIDO);
            dataReader = cmd.ExecuteReader();

            conexion.Close();
            return Ok();
        }

        // POST: api/User
        [HttpPost]
        [Route("Habilitar")]
        public ActionResult PostHabilitar( Usuario partyId)
        {
           
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            //cmd = new SqlCommand("Proc_ObtenerIdPorCorreo", conexion);
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@correo", email2);
            //dataReader = cmd.ExecuteReader();
            //int partyId = 0;
            //while (dataReader.Read())
            //{

            //    int.TryParse(dataReader["PartyFk"].ToString(), out partyId);
            //}


            cmd = new SqlCommand("Proc_HabilitarParty", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", partyId.PARTYID);
            dataReader = cmd.ExecuteReader();

            conexion.Close();
            return Ok();
        }

        // POST: api/User
        [HttpPost]
        [Route("Deshabilitar")]
        public ActionResult PostDeshabilitar(Usuario partyId)
        {

            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            //cmd = new SqlCommand("Proc_ObtenerIdPorCorreo", conexion);
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@correo", email);
            //dataReader = cmd.ExecuteReader();
            //int partyId = 0;
            //while (dataReader.Read())
            //{

            //    int.TryParse(dataReader["PartyFk"].ToString(), out partyId);
            //}

            cmd = new SqlCommand("Proc_DeshabilitarParty", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", partyId.PARTYID);
            dataReader = cmd.ExecuteReader();

            conexion.Close();
            return Ok();



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
