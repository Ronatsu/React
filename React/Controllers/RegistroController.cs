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
        List<Usuarios> USUARIOS = new List<Usuarios>();


        // GET: api/Registro
        [HttpGet]
        public ActionResult<List<Usuarios>> Get()
        {
            EstablecerConexion();
            cmd = new SqlCommand("STORED_PROD_OBTENER_COLABORADORES", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                Usuarios nuevoUsuario = new Usuarios();
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
        public IActionResult CrearUsuario(Usuarios value)
        {
            conexion = new SqlConnection(connectionString);
            conexion.Open();
            cmd = new SqlCommand("Proc_AgregarUsuario", conexion);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Nombre", value.NOMBRE);
            cmd.Parameters.AddWithValue("@PrimerApellido", value.PRIMER_APELLIDO);
            cmd.Parameters.AddWithValue("@SegundoApellido", value.SEGUNDO_APELLIDO);
            cmd.Parameters.AddWithValue("@correo", value.EMAIL);
            cmd.Parameters.AddWithValue("@contrasena", value.CONTRASEÑA);

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
