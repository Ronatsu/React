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
    public class RegistroController : ControllerBase
    {
        // Variables de conexión
        String connectionString = new Conexion().getConnection();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<Usuario> USUARIOS = new List<Usuario>();


        // GET: api/Registro
        [HttpGet]
        public ActionResult<List<Usuario>> Get()
        {

            EstablecerConexion();
            cmd = new SqlCommand("STORED_PROD_OBTENER_COLABORADORES", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                Usuario nuevoUsuario = new Usuario();
                nuevoUsuario.PARTYID = dataReader["PARTYID"].ToString();
                nuevoUsuario.email = dataReader["NOMBRE"].ToString();
                nuevoUsuario.NOMBRE = dataReader["SEGUNDO_NOMBRE"].ToString();
                nuevoUsuario.PRIMER_APELLIDO = dataReader["PRIMER_APELLIDO"].ToString();
                nuevoUsuario.SEGUNDO_APELLIDO = dataReader["SEGUNDO_APELLIDO"].ToString();
                nuevoUsuario.HABILITADO = bool.Parse(dataReader["HABILITADO"].ToString());
                nuevoUsuario.password1 = dataReader["CONTRASEÑA"].ToString();
                nuevoUsuario.TIPO_COLABORADOR = char.Parse(dataReader["TIPO_COLABORADOR"].ToString());
                nuevoUsuario.ROL_USUARIO = dataReader["ROL"].ToString();
                nuevoUsuario.ASIGNA_INCIDENCIA = dataReader["ROL"].ToString();//REVISAR

                USUARIOS.Add(nuevoUsuario);

            }
            conexion.Close();
            var item = USUARIOS;
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // POST: api/Registro
        [HttpPost]
        public IActionResult CrearUsuario(Usuario newUser)
        {
            Password password = new Password();
            if (password.ValidarContrasena(newUser.password2,newUser.password1))
            {
                conexion = new SqlConnection(connectionString);
                conexion.Open();
                cmd = new SqlCommand("Proc_ObtenerIdPorCorreo", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@correo", newUser.email);
                dataReader = cmd.ExecuteReader();
                string email = "";
                while (dataReader.Read())
                {

                    email = dataReader["PartyFk"].ToString();
                }
                conexion.Close();
               
                if (email.Equals(""))
                {
                    string passwordEncry = password.GetMD5(newUser.password1);

                    conexion.Open();
                    cmd = new SqlCommand("Proc_AgregarUsuario", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Nombre", newUser.NOMBRE);
                    cmd.Parameters.AddWithValue("@PrimerApellido", newUser.PRIMER_APELLIDO);
                    cmd.Parameters.AddWithValue("@SegundoApellido", newUser.SEGUNDO_APELLIDO);
                    cmd.Parameters.AddWithValue("@CORREO", newUser.email);
                    cmd.Parameters.AddWithValue("@contrasena", passwordEncry);

                    dataReader = cmd.ExecuteReader();
                    CerrarConexion();
                }
               
              
            }

            return CreatedAtRoute("Get", new { id = newUser.PARTYID }, newUser);
        }

        public void EstablecerConexion()
        {
            conexion = new SqlConnection(connectionString);
            conexion.Open();
        }

        public void CerrarConexion()
        {
            conexion.Close();
        }

        public String RolUsuario(String rol)
        {
            SqlConnection conexionRol = new SqlConnection(connectionString);
            conexionRol.Open();
            SqlCommand cmdRol = new SqlCommand("STORED_OBTENER_ROL_USUARIO", conexionRol);
            cmdRol.CommandType = CommandType.StoredProcedure;
            cmdRol.Parameters.AddWithValue("@ROL_USUARIO", rol);
            SqlDataReader dataReaderRol = cmdRol.ExecuteReader();
            String ResultadoTemporal;
            if (dataReaderRol.Read())
            {
                ResultadoTemporal = dataReaderRol["ROL"].ToString();
                return ResultadoTemporal;
            }
            else
            {
                return null;
            }
            
            
        }
    }
}
