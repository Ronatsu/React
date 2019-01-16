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
        JSON HandleError = new JSON();
        List<Usuario> userList = new List<Usuario>();

        // GET: api/User
        [HttpGet]
        [Route("UsuarioHabilitado")]
        public ActionResult GetUsuarioHabilitado()
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerUsuariosHabilitados", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {

                    Usuario newUser = new Usuario
                    {
                        PARTYID = dataReader["Id"].ToString(),
                        NOMBRE = dataReader["Nombre"].ToString(),
                        PRIMER_APELLIDO = dataReader["PrimerApellido"].ToString(),
                        SEGUNDO_APELLIDO = dataReader["SegundoApellido"].ToString(),
                        ROL_USUARIO = dataReader["Rol"].ToString(),
                        correoElectronico = dataReader["Correo"].ToString()
                    };

                    userList.Add(newUser);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
           
            var item = userList;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);

        }

        [HttpGet]
        [Route("GetAllUsers")]
        public ActionResult GetAllUsers()
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_GetAllUsers", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {

                    Usuario newUser = new Usuario
                    {
                        PARTYID = dataReader["PartyId"].ToString(),
                        NOMBRE = dataReader["Nombre"].ToString(),
                        PRIMER_APELLIDO = dataReader["PrimerApellido"].ToString(),
                        SEGUNDO_APELLIDO = dataReader["SegundoApellido"].ToString(),
                        ROL_USUARIO = dataReader["RolUsuario"].ToString(),
                        correoElectronico = dataReader["ValorMecanismo"].ToString()
                    };

                    userList.Add(newUser);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            
            var item = userList;
            if (item == null)
            {
                return Ok("No hay datos que mostrar");
            }
            return Ok(item);
        }


        // GET: api/User/5
        [HttpGet]
        [Route("userList")]
        public ActionResult GetUserList()
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerNewParties", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {

                    Usuario newUser = new Usuario
                    {
                        PARTYID = dataReader["PartyId"].ToString(),
                        NOMBRE = dataReader["Nombre"].ToString(),
                        PRIMER_APELLIDO = dataReader["PrimerApellido"].ToString(),
                        SEGUNDO_APELLIDO = dataReader["SegundoApellido"].ToString(),
                        ROL_USUARIO = dataReader["RolUsuario"].ToString(),
                        correoElectronico = dataReader["Correo"].ToString()
                    };

                    userList.Add(newUser);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = userList;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }


        // GET: api/User/5
        [HttpPost]
        [Route("GetNombre")]
        public ActionResult GetNombre(Usuario usuario)
        {
            Usuario newUser = new Usuario();
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerNombre", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", usuario.PARTYID);
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {

                    newUser.NOMBRE = dataReader["Nombre"].ToString();
                    newUser.PRIMER_APELLIDO = dataReader["PrimerApellido"].ToString();
                    newUser.SEGUNDO_APELLIDO = dataReader["SegundoApellido"].ToString();

                    // userList.Add(newUser);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = newUser;
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
            try
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
                    cmd.Parameters.AddWithValue("@constrasenaActual", s);
                    dataReader = cmd.ExecuteReader();

                    conexion.Close();
                }
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        [Route("DarseDeBaja")]
        public ActionResult DarseDeBaja(Usuario party)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();

                cmd = new SqlCommand("Proc_DarseDeBaja", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", party.PARTYID);
                dataReader = cmd.ExecuteReader();

                conexion.Close();               
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            return Ok();
        }

        [HttpPost]
        [Route("CambiarNombre")]
        public ActionResult CambiarNombre(Usuario party)
        {
            try
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
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            return Ok();
        }

        // POST: api/User
        [HttpPost]
        [Route("Habilitar")]
        public ActionResult PostHabilitar(Usuario partyId)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();

                cmd = new SqlCommand("Proc_HabilitarParty", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", partyId.PARTYID);
                dataReader = cmd.ExecuteReader();

                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            
            return Ok();
        }

        // POST: api/User
        [HttpPost]
        [Route("Deshabilitar")]
        public ActionResult PostDeshabilitar(Usuario partyId)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_DeshabilitarParty", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", partyId.PARTYID);
                dataReader = cmd.ExecuteReader();

                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }           
            return Ok();
        }
    }
}
