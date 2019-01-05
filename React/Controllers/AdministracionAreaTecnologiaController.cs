using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using React.Model;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdministracionAreaTecnologiaController : ControllerBase
    {

        string ConnectionString = new Conexion().getConnection();
        SqlConnection Connection;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<Tecnologia> Lista_tecnologia = new List<Tecnologia>();
        List<Area> Lista_Area = new List<Area>();
        List<TipoTecnologia> Lista_TipoTecnologia = new List<TipoTecnologia>();
        JSON errorHandle = new JSON();
        // GET: api/AdministracionAreaTecnologia
        [HttpGet]
        [Route("Tecnologia")]
        public ActionResult<List<Tecnologia>> Get()
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_ObtenerTecnologia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Tecnologia tecnologia = new Tecnologia();
                    tecnologia.TecnologiaId = dataReader["TECNOLOGIA_ID"].ToString();
                    tecnologia.NombreTecnologia = dataReader["NOMBRE_TEC"].ToString();
                    tecnologia.TipoTecnologiaFk = int.Parse(dataReader["TIPO_TECNOLOGIA"].ToString());
                    tecnologia.CriticoS_N = char.Parse(dataReader["TIPO_TECNOLOGIA"].ToString());

                    Lista_tecnologia.Add(tecnologia);
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                errorHandle.SaveDataError(ex.Message, ex.StackTrace);
            }

            var item = Lista_tecnologia;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("MethodGetTypeTech")]
        public ActionResult GetTypeTech(Tecnologia tecnologia)
        {
            Tecnologia typeTechnoloy = new Tecnologia();
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_ObtenerTipoTecnologia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID_TECHNOLOGY", tecnologia.TecnologiaId);
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    typeTechnoloy.TipoTecnologiaNombre = dataReader["TipoTecnologia"].ToString();
                    typeTechnoloy.CriticoS_N = char.Parse(dataReader["Critico"].ToString());
                    typeTechnoloy.NombreTecnologia = dataReader["NombreTecnologia"].ToString();
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                errorHandle.SaveDataError(ex.Message, ex.StackTrace);
                throw;
            }
            var item = typeTechnoloy;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet]
        [Route("TipoTecnologia")]
        public ActionResult<List<TipoTecnologia>> GetTipoTecnologia()
        {

            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_TipoTecnologia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    TipoTecnologia tipoTecnologia = new TipoTecnologia();
                    tipoTecnologia.TIPO_TECNOLOGIA_ID = int.Parse(dataReader["TIPO_TECNOLOGIA_ID"].ToString());
                    tipoTecnologia.TIPO_TECNOLOGIA = dataReader["TIPO_TECNOLOGIA"].ToString();

                    Lista_TipoTecnologia.Add(tipoTecnologia);

                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                errorHandle.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = Lista_TipoTecnologia;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet]
        [Route("Area")]
        public ActionResult<List<Area>> GetArea()
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_ObtenerArea", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Area area = new Area();
                    area.AreaID = dataReader["ID_AREA"].ToString();
                    area.NombreArea = dataReader["NOMBRE_AREA"].ToString();
                    area.NombreArea = dataReader["HABILITADO"].ToString();
                    area.NombreArea = dataReader["TECNOLOGIA_ID"].ToString();
                    area.NombreArea = dataReader["AREA_PRINCIPAL_ID"].ToString();
                    area.TecnologiaFk = dataReader["NOMBRE_TECNOLOGIA"].ToString();
                    area.AreaFk = dataReader["NOMBRE_AREA_PRINCIPAL"].ToString();

                    Lista_Area.Add(area);

                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                errorHandle.SaveDataError(ex.Message, ex.StackTrace);
                throw;
            }
            
            var item = Lista_Area;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // GET: api/AdministracionAreaTecnologia/5
        [HttpGet("{id}", Name = "GetTecnologia")]
        public string Get(int id)
        {
            return "value";
        }

        // GET: api/AdministracionAreaTecnologia/5
        [HttpGet("{id}", Name = "GetArea")]
        [Route("ObtenerArea")]
        public string GetArea(int id)
        {
            return "value";
        }

        // POST: api/AdministracionAreaTecnologia
        [HttpPost]
        [Route("InsertarTecnologia")]
        public ActionResult Post(ModelT Tecno)
        {
            //Verificación de la existencia de la tecnologia entrante
            SqlConnection ConnectionTecno = new SqlConnection(ConnectionString);
            ConnectionTecno.Open();
            cmd = new SqlCommand("Proc_VerificarNuevaTecnologia", ConnectionTecno);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@NUEVA_TECNOLOGIA", Tecno.NombreTecnologia);
            dataReader = cmd.ExecuteReader();
            String validacionTecnologia = "";
            while (dataReader.Read())
            {
                validacionTecnologia = dataReader["NOMBRE_TECNOLOGIA"].ToString();
            }

            ConnectionTecno.Close();
            //valida que la tecnologia venga vacia.
            if (validacionTecnologia.Equals(""))
            {
                //Metodo que retorna el ID del tipo de tecnologia segun su nombre
                SqlConnection ConnectionTipoTecnologia = new SqlConnection(ConnectionString);
                ConnectionTipoTecnologia.Open();
                cmd = new SqlCommand("Proc_ObtenerIDTipoTecnologia", ConnectionTipoTecnologia);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@NOMBRE_TIPO", Tecno.TipoTecnologiaFk);
                dataReader = cmd.ExecuteReader();
                int IDTipoTecnologia = 0;
                while (dataReader.Read())
                {
                    IDTipoTecnologia = int.Parse(dataReader["ID_TIPO_TECNOLOGIA"].ToString());
                }


                ConnectionTipoTecnologia.Close();
                if (IDTipoTecnologia > 0)
                {
                    Connection = new SqlConnection(ConnectionString);
                    Connection.Open();
                    cmd = new SqlCommand("Proc_insetarNuevaTecnologia", Connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@NombreTecnologia", Tecno.NombreTecnologia);
                    cmd.Parameters.AddWithValue("@TipoTecnologia", IDTipoTecnologia);
                    cmd.Parameters.AddWithValue("@CriticoS_N", Tecno.CriticoS_N);

                    dataReader = cmd.ExecuteReader();
                    Connection.Close();
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }

        }

        //POST: api/AdministracionAreaTecnologia
        [HttpPost]
        [Route("InsertarArea")]
        public ActionResult Post(Area value)
        {
            // Validar la existencia del área
            SqlConnection ConnectionValid = new SqlConnection(ConnectionString);
            ConnectionValid.Open();
            cmd = new SqlCommand("Proc_ValidarExistenciaArea", ConnectionValid);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@NOMBRE_AREA", value.NombreArea);
            dataReader = cmd.ExecuteReader();
            String ValidacionArea = "";
            while (dataReader.Read())
            {
                ValidacionArea = dataReader["ID_AREA"].ToString();
            }
            ConnectionValid.Close();
            // Obtener ID AreaPrincipal
            SqlConnection ConnectionAreaID = new SqlConnection(ConnectionString);
            ConnectionAreaID.Open();
            cmd = new SqlCommand("Proc_ValidarExistenciaArea", ConnectionAreaID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@NOMBRE_AREA", value.AreaFk);
            dataReader = cmd.ExecuteReader();
            String AreaID = "";
            while (dataReader.Read())
            {
                AreaID = dataReader["ID_AREA"].ToString();
            }
            ConnectionAreaID.Close();
            //Validar si existe el id de la tecnologia.
            if (ValidacionArea.Equals(""))
            {
                SqlConnection ConnectionTecnoID = new SqlConnection(ConnectionString);
                ConnectionTecnoID.Open();
                cmd = new SqlCommand("Proc_ObtenerIDTecnologia", ConnectionTecnoID);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@NOMBRE_TECNOLGIA", value.TecnologiaFk);
                dataReader = cmd.ExecuteReader();
                int TecnologiaID = 0;
                while (dataReader.Read())
                {
                    TecnologiaID = int.Parse(dataReader["ID_TECNOLOGIA"].ToString());
                }
                ConnectionTecnoID.Close();
                //Si el atributo es mayor que cero, existe.
                if (TecnologiaID > 0)
                {
                    Connection = new SqlConnection(ConnectionString);
                    Connection.Open();
                    cmd = new SqlCommand("Proc_insetarNuevaArea", Connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@NombreArea", value.NombreArea);
                    cmd.Parameters.AddWithValue("@TecnologiaFk", TecnologiaID);
                    cmd.Parameters.AddWithValue("@AreaFk", AreaID);

                    dataReader = cmd.ExecuteReader();
                    Connection.Close();
                    return Ok(value);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }


        }

        [HttpPost]
        [Route("eliminarArea")]
        public ActionResult eliminarArea(Area value)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_BorrarArea", Connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@AREA_BORRAR", value.AreaID);

                dataReader = cmd.ExecuteReader();
                Connection.Close();
                return Ok(value);
            }
            catch (Exception)
            {
                return NotFound();
            }



        }


        [HttpPost]
        [Route("eliminarTecnologia")]
        public ActionResult eliminarTecnologia(Tecnologia value)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_BorrarTecnologia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TECNOLOGIA_BORRAR", value.TecnologiaId);

                dataReader = cmd.ExecuteReader();
                Connection.Close();
                return Ok(value);
            }
            catch (Exception)
            {
                return NotFound();
            }



        }

        [HttpPost]
        [Route("modificarTecnologia")]
        public ActionResult ModificarTecnologia(ModelT value)
        {
            try
            {
                //Metodo que retorna el ID del tipo de tecnologia segun su nombre
                SqlConnection ConnectionTipoTecnologia = new SqlConnection(ConnectionString);
                ConnectionTipoTecnologia.Open();
                cmd = new SqlCommand("Proc_ObtenerIDTipoTecnologia", ConnectionTipoTecnologia);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@NOMBRE_TIPO", value.TipoTecnologiaFk);
                dataReader = cmd.ExecuteReader();
                int IDTipoTecnologia = 0;
                while (dataReader.Read())
                {
                    IDTipoTecnologia = int.Parse(dataReader["ID_TIPO_TECNOLOGIA"].ToString());
                }


                ConnectionTipoTecnologia.Close();
                if (!(IDTipoTecnologia == 0))
                {
                    Connection = new SqlConnection(ConnectionString);
                    Connection.Open();
                    cmd = new SqlCommand("Proc_modificarTecnologia", Connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@TecnologiaID", value.TecnologiaId);
                    cmd.Parameters.AddWithValue("@NombreTecnologia", value.NombreTecnologia);
                    cmd.Parameters.AddWithValue("@TipoTecnologia", IDTipoTecnologia);
                    cmd.Parameters.AddWithValue("@CriticoS_N", value.CriticoS_N);

                    dataReader = cmd.ExecuteReader();
                    Connection.Close();
                    return Ok(value);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                return NotFound();
            }



        }


        [HttpPost]
        [Route("modificarArea")]
        public ActionResult ModificarArea(Area value)
        {
            try
            {
                if (!(value.AreaFk == null) || !value.AreaFk.Trim().Equals(""))
                {
                    // Obtener ID AreaPrincipal
                    SqlConnection ConnectionAreaID = new SqlConnection(ConnectionString);
                    ConnectionAreaID.Open();
                    cmd = new SqlCommand("Proc_ValidarExistenciaArea", ConnectionAreaID);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NOMBRE_AREA", value.AreaFk);
                    dataReader = cmd.ExecuteReader();
                    String AreaID = "";
                    while (dataReader.Read())
                    {
                        AreaID = dataReader["ID_AREA"].ToString();
                    }
                    ConnectionAreaID.Close();

                    if (!(value.TecnologiaFk == null) || !value.TecnologiaFk.Trim().Equals(""))
                    {
                        SqlConnection ConnectionTecnoID = new SqlConnection(ConnectionString);
                        ConnectionTecnoID.Open();
                        cmd = new SqlCommand("Proc_ObtenerIDTecnologia", ConnectionTecnoID);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@NOMBRE_TECNOLGIA", value.TecnologiaFk);
                        dataReader = cmd.ExecuteReader();
                        int TecnologiaID = 0;
                        while (dataReader.Read())
                        {
                            TecnologiaID = int.Parse(dataReader["ID_TECNOLOGIA"].ToString());
                        }
                        ConnectionTecnoID.Close();

                        if (!(TecnologiaID == 0))
                        {
   
                            Connection = new SqlConnection(ConnectionString);
                            Connection.Open();



                            cmd = new SqlCommand("Proc_ModificarArea", Connection);
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.AddWithValue("@AreaID", value.AreaID);
                            cmd.Parameters.AddWithValue("@NombreArea", value.NombreArea);
                            cmd.Parameters.AddWithValue("@TecnologiaFk", TecnologiaID);
                            cmd.Parameters.AddWithValue("@AreaFk", AreaID);
                            cmd.Parameters.AddWithValue("@Habilitado", value.Habilitado);

                            dataReader = cmd.ExecuteReader();
                            Connection.Close();
                            return Ok(value);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                    else
                    {
                        return NotFound();
                    }

                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        // PUT: api/AdministracionAreaTecnologia/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [Route("eliminarArea")]
        public void Delete(string id)
        {
            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_BorrarArea", Connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@AREA_BORRAR", id);

            dataReader = cmd.ExecuteReader();
            Connection.Close();
        }
    }
}
