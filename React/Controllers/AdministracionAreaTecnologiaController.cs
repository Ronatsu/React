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
    public class AdministracionAreaTecnologiaController : ControllerBase
    {

        string ConnectionString = new Conexion().getConnection();
        SqlConnection Connection;
        SqlCommand cmd;
        SqlDataReader dataReader;
        List<Tecnologia> Lista_tecnologia = new List<Tecnologia>();
        List<Area> Lista_Area = new List<Area>();
        List<TipoTecnologia> Lista_TipoTecnologia = new List<TipoTecnologia>();

        //manejo de errores
        JSON HandleError = new JSON();

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
                    tecnologia.TipoTecnologia = dataReader["TIPO_TECNOLOGIA"].ToString();
                    tecnologia.Critico = dataReader["Critico"].ToString();
                    tecnologia.Estado = dataReader["Estado"].ToString();

                    Lista_tecnologia.Add(tecnologia);
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }

            var item = Lista_tecnologia;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }


        [HttpGet]
        [Route("GetTecnologiaHabilitado")]
        public ActionResult<List<Tecnologia>> GetTecnologiaHabilitado()
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_ObtenerTecnologiaHabilitado", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Tecnologia tecnologia = new Tecnologia();
                    tecnologia.TecnologiaId = dataReader["TECNOLOGIA_ID"].ToString();
                    tecnologia.NombreTecnologia = dataReader["NOMBRE_TEC"].ToString();
                    tecnologia.TipoTecnologia = dataReader["TIPO_TECNOLOGIA"].ToString();
                    tecnologia.Critico = dataReader["Critico"].ToString();
                    tecnologia.Estado = dataReader["Estado"].ToString();

                    Lista_tecnologia.Add(tecnologia);
                }
                Connection.Close();

                var item = Lista_tecnologia;
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
        [Route("MethodGetTypeTech")]
        public ActionResult GetTypeTech(Tecnologia tecnologia)
        {
            //Tecnologia tecnologia = new Tecnologia();
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
                    tecnologia.TipoTecnologiaNombre = dataReader["TipoTecnologia"].ToString();
                    tecnologia.Critico = dataReader["Critico"].ToString();
                    tecnologia.NombreTecnologia = dataReader["NombreTecnologia"].ToString();
                    tecnologia.Estado = dataReader["ESTADO"].ToString();
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                throw;
            }
            var item = tecnologia;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("ObtenerAreaTecno")]
        public ActionResult ObtenerAreaTecno(Tecnologia tecno)
        {
            List<Area> areas = new List<Area>();
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_ObtenerAreaPorTecnologia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@idTecno", tecno.TecnologiaId);
                dataReader = cmd.ExecuteReader();
                
                while (dataReader.Read())
                {
                    Area area = new Area();
                    area.NombreArea = dataReader["NombreArea"].ToString();
                    area.AreaID = dataReader["AreaId"].ToString();
                    areas.Add(area);
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                throw;
            }
            var item =areas;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("GetAreaPorId")]
        public ActionResult GetAreaPorId(Area area)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_ObtenerAreaPorId", Connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", area.AreaID);
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    area.NombreArea = dataReader["NOMBRE_AREA"].ToString();
                    area.AreaFk = dataReader["AREA_PADRE"].ToString();
                    area.TecnologiaFk = dataReader["TECNOLOGIA_AREA"].ToString();
                    area.Estado = dataReader["ESTADO"].ToString();
                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                throw;
            }
            var item = area;
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
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
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
                    area.AreaID = dataReader["AREA_ID"].ToString();
                    area.NombreArea = dataReader["NOMBRE_AREA"].ToString();
                    area.TecnologiaFk = dataReader["TECNOLOGIA_AREA"].ToString();
                    area.AreaFk = dataReader["AREA_PADRE"].ToString();
                    area.Estado = dataReader["Estado"].ToString();

                    Lista_Area.Add(area);

                }
                Connection.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = Lista_Area;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }


        // POST: api/AdministracionAreaTecnologia
        [HttpPost]
        [Route("InsertarTecnologia")]
        public ActionResult Post(Tecnologia Tecno)
        {
            try
            {
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
                    Connection = new SqlConnection(ConnectionString);
                    Connection.Open();
                    cmd = new SqlCommand("Proc_insetarNuevaTecnologia", Connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@NombreTecnologia", Tecno.NombreTecnologia);
                    cmd.Parameters.AddWithValue("@TipoTecnologia", Tecno.TipoTecnologia);
                    cmd.Parameters.AddWithValue("@CriticoS_N", Tecno.Critico);
                    cmd.Parameters.AddWithValue("@Estado", Tecno.Estado);

                    dataReader = cmd.ExecuteReader();
                    Connection.Close();
                    return Ok();
                }
                else
                {
                    return Ok(Tecno.NombreTecnologia);
                }
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
            //Verificación de la existencia de la tecnologia entrante
           
        }

        //POST: api/AdministracionAreaTecnologia
        [HttpPost]
        [Route("InsertarArea")]
        public ActionResult InsertarArea(Area value)
        {
            try
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

                //Validar si existe el id de la tecnologia.
                if (ValidacionArea.Equals(""))
                {
                    if (value.AreaFk.Equals("0"))
                    {
                        Connection = new SqlConnection(ConnectionString);
                        Connection.Open();
                        cmd = new SqlCommand("Proc_insetarNuevaAreaSinArea", Connection);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@NombreArea", value.NombreArea);
                        cmd.Parameters.AddWithValue("@TecnologiaFk", value.TecnologiaFk);
                        cmd.Parameters.AddWithValue("@Estado", value.Estado);
                        dataReader = cmd.ExecuteReader();
                        Connection.Close();
                        return Ok();
                    }
                    else
                    {
                        Connection = new SqlConnection(ConnectionString);
                        Connection.Open();
                        cmd = new SqlCommand("Proc_insetarNuevaAreaConArea", Connection);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@NombreArea", value.NombreArea);
                        cmd.Parameters.AddWithValue("@TecnologiaFk", value.TecnologiaFk);
                        cmd.Parameters.AddWithValue("@AreaFk", value.AreaFk);
                        cmd.Parameters.AddWithValue("@Estado", value.Estado);
                        dataReader = cmd.ExecuteReader();
                        Connection.Close();
                        return Ok();
                    }
                }
                else
                {
                    return Ok(value.NombreArea);
                }

            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }

        }

        [HttpPost]
        [Route("modificarTecnologia")]
        public ActionResult ModificarTecnologia(Tecnologia value)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                cmd = new SqlCommand("Proc_modificarTecnologia", Connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TecnologiaID", value.TecnologiaId);
                cmd.Parameters.AddWithValue("@NombreTecnologia", value.NombreTecnologia);
                if (value.TipoTecnologia.Equals("PaaS"))
                {
                    value.TipoTecnologia="1";
                }
                else if (value.TipoTecnologia.Equals("IaaS"))
                {
                    value.TipoTecnologia="2";
                }

                cmd.Parameters.AddWithValue("@TipoTecnologia", value.TipoTecnologia);
                if (value.Critico.Equals("Sí"))
                {
                    value.Critico = "s";
                }else if (value.Critico.Equals("No")){
                    value.Critico = "n";
                }
                cmd.Parameters.AddWithValue("@CriticoS_N", value.Critico);
                if (value.Estado.Equals("Habilitado"))
                {
                    value.Estado = "28";
                }
                else if (value.Estado.Equals("Deshabilitado"))
                {
                    value.Estado = "29";
                }
                cmd.Parameters.AddWithValue("@Estado", value.Estado);

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

                    if (AreaID.Equals(""))
                    {
                        Connection = new SqlConnection(ConnectionString);
                        Connection.Open();
                        cmd = new SqlCommand("Proc_ModificarArea", Connection);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@AreaID", value.AreaID);
                        cmd.Parameters.AddWithValue("@NombreArea", value.NombreArea);
                        cmd.Parameters.AddWithValue("@TecnologiaFk", value.TecnologiaFk);
                        cmd.Parameters.AddWithValue("@AreaFk", value.AreaFk);
                        cmd.Parameters.AddWithValue("@estado", value.Estado);

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
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return NotFound();
            }
        }
    }
}
