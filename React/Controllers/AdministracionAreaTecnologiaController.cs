using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
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
        // GET: api/AdministracionAreaTecnologia
        [HttpGet]
        [Route("Tecnologia")]
        public ActionResult<List<Tecnologia>> Get()
        {
            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_ObtenerTecnologia", Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                Tecnologia tecnologia = new Tecnologia();
                tecnologia.TecnologiaId = int.Parse(dataReader["TECNOLOGIA_ID"].ToString());
                tecnologia.NombreTecnologia = dataReader["NOMBRE_TEC"].ToString();
                tecnologia.TipoTecnologiaFk = int.Parse(dataReader["TIPO_TECNOLOGIA"].ToString());
                tecnologia.CriticoS_N = char.Parse(dataReader["TIPO_TECNOLOGIA"].ToString());


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


        [HttpGet]
        [Route("TipoTecnologia")]
        public ActionResult<List<TipoTecnologia>> GetTipoTecnologia()
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
            var item = Lista_TipoTecnologia;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet]
        [Route("Area")]
        public ActionResult<List<string>> GetArea()
        {
            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_ObtenerArea", Connection);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                Area area = new Area();
                area.NombreArea = dataReader["NOMBRE_AREA"].ToString();

                Lista_Area.Add(area);

            }
            Connection.Close();
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
        public ActionResult Post(Tecnologia value)
        {
            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_AgregarUsuario", Connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NombreTecnologia", value.NombreTecnologia);
            cmd.Parameters.AddWithValue("@TipoTecnologia", value.TipoTecnologiaFk);
            cmd.Parameters.AddWithValue("@CriticoS_N", value.CriticoS_N);

            dataReader = cmd.ExecuteReader();
            Connection.Close();
            return CreatedAtRoute("GetTecnologia", new { id = value.TecnologiaId }, value);
        }

        // POST: api/AdministracionAreaTecnologia
        [HttpPost]
        [Route("InsertarArea")]
        public ActionResult Post(Area value)
        {
            Connection = new SqlConnection(ConnectionString);
            Connection.Open();
            cmd = new SqlCommand("Proc_insetarNuevaArea", Connection);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NombreArea", value.NombreArea);
            cmd.Parameters.AddWithValue("@TecnologiaFk", value.TecnologiaFk);
            cmd.Parameters.AddWithValue("@AreaFk", value.AreaFk);

            dataReader = cmd.ExecuteReader();
            Connection.Close();
            return CreatedAtRoute("GetArea", new { id = value.AreaID }, value);
        }

        // PUT: api/AdministracionAreaTecnologia/5
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
