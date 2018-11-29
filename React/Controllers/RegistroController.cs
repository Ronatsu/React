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
        String connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
                                  "Initial Catalog=ProyectoAnderson;" +
                                  "Integrated security=True;";
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<RegistroUsuarios> USUARIOS = new List<RegistroUsuarios>();


        // GET: api/Registro
        [HttpGet]
        public ActionResult<List<RegistroUsuarios>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("STORED_PROD_OBTENER_COLABORADORES", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                RegistroUsuarios nuevoUsuario = new RegistroUsuarios();
                nuevoUsuario.PARTYID = dataReader["PARTYID"].ToString();
                nuevoUsuario.EMAIL = dataReader["NOMBRE"].ToString();
                nuevoUsuario.NOMBRE = dataReader["SEGUNDO_NOMBRE"].ToString();
                nuevoUsuario.PRIMER_APELLIDO = dataReader["PRIMER_APELLIDO"].ToString();
                nuevoUsuario.SEGUNDO_APELLIDO = dataReader["SEGUNDO_APELLIDO"].ToString();
                nuevoUsuario.HABILITADO = bool.Parse(dataReader["HABILITADO"].ToString());
                nuevoUsuario.CONTRASEÑA = dataReader["CONTRASEÑA"].ToString();
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
        public IActionResult CrearUsuario(RegistroUsuarios value)
        {
            conexion = new SqlConnection(connectionString);
            conexion.Open();
            cmd = new SqlCommand("Stored_Pro_InsertarParty", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CORREO", value.EMAIL);
            cmd.Parameters.AddWithValue("@NOMBRE", value.NOMBRE);
            cmd.Parameters.AddWithValue("@PRIMER_APELLIDO", value.PRIMER_APELLIDO);
            cmd.Parameters.AddWithValue("@SEGUNDO_APELLIDO", value.SEGUNDO_APELLIDO);
            cmd.Parameters.AddWithValue("@HABILITADO", value.HABILITADO);
            cmd.Parameters.AddWithValue("@CONTRASEÑA", value.CONTRASEÑA);
            cmd.Parameters.AddWithValue("@TIPO_COLABORADOR", value.TIPO_COLABORADOR);
            cmd.Parameters.AddWithValue("@ROL_USUARIO", int.Parse(RolUsuario(value.ROL_USUARIO)));
            cmd.Parameters.AddWithValue("@ASIGNA_INCIDENCIA", true);

            dataReader = cmd.ExecuteReader();
            CerrarConexion();
            return CreatedAtRoute("Get", new { id = value.PARTYID }, value);
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
