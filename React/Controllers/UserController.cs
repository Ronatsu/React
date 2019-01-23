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
    public class UserController : ControllerBase
    {

        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        private List<string> emailUser= new List<string>();

        //manejo de errores
        JSON HandleError = new JSON();

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
                List<Usuario> userList = new List<Usuario>();
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
                var item = userList;
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }

        [HttpGet]
        [Route("GetEstados")]
        public ActionResult GetEstados()
        {
            try
            {

                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerEstadoParty", conexion);
                cmd.CommandType = CommandType.StoredProcedure;

                dataReader = cmd.ExecuteReader();
                List<MetaEstado> estados = new List<MetaEstado>();
                while (dataReader.Read())
                {

                    MetaEstado estado = new MetaEstado
                    {
                        Estado = dataReader["ESTADO"].ToString(),
                        Id = dataReader["ID"].ToString()
                    };

                    estados.Add(estado);
                }
                conexion.Close();
                var item = estados;
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
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
                List<Usuario> userList = new List<Usuario>();
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
                        ,Estado = dataReader["estado"].ToString()
                    };

                    userList.Add(newUser);
                }
                conexion.Close();
                var item = userList;
                if (item == null)
                {
                    return Ok("No hay datos que mostrar");
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
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
                List<Usuario> userList = new List<Usuario>();
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
                var item = userList;
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);

            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }


        // GET: api/User/5
        [HttpPost]
        [Route("GetNombre")]
        public ActionResult GetNombre(Usuario usuario)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerNombre", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", usuario.PARTYID);

                dataReader = cmd.ExecuteReader();
                Usuario newUser = new Usuario();
                while (dataReader.Read())
                {

                    newUser.NOMBRE = dataReader["Nombre"].ToString();
                    newUser.PRIMER_APELLIDO = dataReader["PrimerApellido"].ToString();
                    newUser.SEGUNDO_APELLIDO = dataReader["SegundoApellido"].ToString();


                }
                conexion.Close();
                var item = newUser;
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
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


                return Ok();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
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

                return Ok();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
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
                return Ok();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }
        [HttpPost]
        [Route("ModificarUsuario")]
        public ActionResult ModificarUsuario(Usuario party)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();

                cmd = new SqlCommand("Proc_ModificarUsuario", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", party.PARTYID);
                cmd.Parameters.AddWithValue("@rol", party.ROL_USUARIO);
                cmd.Parameters.AddWithValue("@estado", party.Estado);
                dataReader = cmd.ExecuteReader();

                conexion.Close();
                return Ok();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }

        [HttpPost]
        [Route("GetUsuarioPorId")]
        public ActionResult GetUsuarioPorId(Usuario party)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();

                cmd = new SqlCommand("Proc_ObtenerPartyPorId", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", party.PARTYID);
                dataReader = cmd.ExecuteReader();

                Usuario newUser = new Usuario();
                while (dataReader.Read())
                {
                    newUser.NOMBRE = dataReader["Nombre"].ToString();
                    newUser.ROL_USUARIO = dataReader["ROL"].ToString();
                    newUser.RolId = dataReader["ROLid"].ToString();
                    newUser.Estado = dataReader["ESTADO"].ToString();
                    newUser.EstadoId = dataReader["ESTADOid"].ToString();
                }
                conexion.Close();
                var item = newUser;
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }

        // POST: api/User
        [HttpPost]
        [Route("Habilitar")]
        public ActionResult PostHabilitar(Usuario userData)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();

                cmd = new SqlCommand("Proc_HabilitarParty", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", userData.PARTYID);
                cmd.Parameters.AddWithValue("@rol", userData.ROL_USUARIO);
                dataReader = cmd.ExecuteReader();
                conexion.Close();

                string body = "Usted ha sido aceptado en la plataforma Anderson." +
                   "\nPara poder iniciar sesión, dirigase al siguiente enlace: http://localhost:44372/";
                string subject = "Nuevo usuario Anderson";
                emailUser.Add(userData.email);
                new EnviarCorreo().enviarCorreo(emailUser, subject, body);

                return Ok();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }

        // POST: api/User
        [HttpPost]
        [Route("Deshabilitar")]
        public ActionResult PostDeshabilitar(Usuario userData)
        {
            try
            {
                conexion = new SqlConnection(conexionString.getConnection());
                conexion.Open();

                cmd = new SqlCommand("Proc_DeshabilitarParty", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", userData.PARTYID);
                dataReader = cmd.ExecuteReader();
                conexion.Close();

                string body = "Usted ha sido rechazado en la plataforma Anderson." +
                  "\nCualquier consulta, dirigirse a las oficinas de IMPESA";
                string subject = "Rechazo de solicitud a Anderson";
                emailUser.Add(userData.email);
                new EnviarCorreo().enviarCorreo(emailUser, subject, body);

                return Ok();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }
    }
}
