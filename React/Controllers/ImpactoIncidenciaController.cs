﻿using System;
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
            EstablecerConexion();
            cmd = new SqlCommand("Proc_ImpactoIncidencia", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            dataReader = cmd.ExecuteReader();
            List<TipoImpacto> nuevaLista = new List<TipoImpacto>();
            while (dataReader.Read())
            {
                TipoImpacto impacto = new TipoImpacto();
                impacto.Descripcion = dataReader["TIPO_IMPACTO"].ToString();
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

        // GET: api/ImpactoIncidencia/5
        [HttpGet("{id}", Name = "GetImpacto")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ImpactoIncidencia
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ImpactoIncidencia/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        public void EstablecerConexion()
        {
            conexion = new SqlConnection(conexionString.getConnection());
            conexion.Open();
        }
    }
}
