using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using React.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MetodoDeteccionController : ControllerBase
    {
        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;

        //manejo de errores
        JSON HandleError = new JSON();



        // GET: api/MetodoDeteccion/
        [HttpGet]
        [Route("VerMetodos")]
        public ActionResult<List<string>> VerMetodos()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
            cmd = new SqlCommand("Proc_ObtenerMetodoDeteccion", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            List<MetodoDeteccion> nuevaLista = new List<MetodoDeteccion>();
            while (dataReader.Read())
            {
                MetodoDeteccion metodo = new MetodoDeteccion();
                metodo.MetodoDeteccionNombre = dataReader["MetodoDeteccion"].ToString();
                metodo.Id = Int32.Parse(dataReader["ID"].ToString());

                nuevaLista.Add(metodo);

            }
            conexion.Close();
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("ObtenerPorId")]
        public ActionResult<List<string>> ObtenerPorId(MetodoDeteccion metodo)
        {
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ObtenerMetodoDeteccionPorId", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", metodo.Id);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                metodo.MetodoDeteccionNombre = dataReader["MetodoDeteccion"].ToString();
                metodo.Estado = dataReader["MetaEstado"].ToString();
            }
            conexion.Close();
            var item = metodo;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("ModificarMetodo")]
        public ActionResult<List<string>> ModificarMetodo(MetodoDeteccion metodo)
        {
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ModificarMetodoDeteccion", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", metodo.Id);
                cmd.Parameters.AddWithValue("@MetodoDeteccionNombre", metodo.MetodoDeteccionNombre);
                cmd.Parameters.AddWithValue("@estado", metodo.Estado);

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

        // POST: api/MetodoDeteccion
        [HttpPost]
        [Route("AgregarMetodo")]

        public ActionResult<List<string>> AgregarMetodo(MetodoDeteccion value)
        {
            if (!value.MetodoDeteccionNombre.Equals(""))
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ExisteMetodoDeteccion", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@metodoDeteccion", value.MetodoDeteccionNombre);


                dataReader = cmd.ExecuteReader();
                int id = 0;
                while (dataReader.Read())
                {
                    int.TryParse(dataReader["MetodoDeteccionId"].ToString(), out id);
                    value.Id = id;
                }
                conexion.Close();

                if (id == 0)
                {
                    EstablecerConexion();
                    cmd = new SqlCommand("Proc_AgregarMetodoDeteccion", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@MetodoDeteccionNombre", value.MetodoDeteccionNombre);
                    cmd.Parameters.AddWithValue("@Estado", value.Estado);

                    dataReader = cmd.ExecuteReader();

                    conexion.Close();
                    return Ok();
                }
                return Ok(value.MetodoDeteccionNombre);
            }

            return NotFound();
        }
        public void EstablecerConexion()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
        }

    }
}
