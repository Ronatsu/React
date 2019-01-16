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
    public class ImpactoIncidenciaController : ControllerBase
    {
        Conexion conexionString = new Conexion();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        JSON HandleError = new JSON();

        // GET: api/ImpactoIncidencia
        [HttpGet]
        [Route("ImpactoIncidencia")]
        public ActionResult<List<string>> Get()
        {
            List<TipoImpacto> nuevaLista = new List<TipoImpacto>();
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ImpactoIncidencia", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    TipoImpacto impacto = new TipoImpacto();
                    impacto.Descripcion = dataReader["TIPO_IMPACTO"].ToString();
                    impacto.Id = Int32.Parse(dataReader["ID"].ToString());

                    nuevaLista.Add(impacto);
                }
                conexion.Close();
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
            var item = nuevaLista;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet]
        [Route("ProbabilidadImpacto")]
        public ActionResult<List<string>> ProbabilidadImpacto()
        {
            try
            {
                EstablecerConexion();
                cmd = new SqlCommand("Proc_ObtenerProbabilidadImpacto", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                dataReader = cmd.ExecuteReader();
                List<TipoImpacto> nuevaLista = new List<TipoImpacto>();
                while (dataReader.Read())
                {
                    TipoImpacto impacto = new TipoImpacto();
                    impacto.Descripcion = dataReader["ProbabilidadImpacto"].ToString();
                    impacto.Id = Int32.Parse(dataReader["ID"].ToString());

                    nuevaLista.Add(impacto);

                }
                conexion.Close();
                var item = nuevaLista;
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
                return Conflict();
            }
        }
        public void EstablecerConexion()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
        }
    }
}
