﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API_Ejemplo.Model;
using React.Model;
using Microsoft.AspNetCore.Authorization;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RecuperarContraseñaController : ControllerBase
    {

        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;
        JSON HandleError = new JSON();
        // POST: api/RecuperarContraseña
        [HttpPost]
        public void RecuperarContraseña(Correo correo)
        {
            try
            {
                if (correo.email1.Equals(correo.email2))
                {

                    Conexion conexionString = new Conexion();
                    conexion = new SqlConnection(conexionString.getConnection());
                    conexion.Open();
                    cmd = new SqlCommand("Proc_ObtenerIdPorCorreo", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@correo", correo.email1);
                    dataReader = cmd.ExecuteReader();
                    int partyId = 0;
                    while (dataReader.Read())
                    {

                        int.TryParse(dataReader["PartyFk"].ToString(), out partyId);
                    }
                    conexion.Close();


                    if (partyId != 0)
                    {

                        Password password = new Password();
                        string simplePassword = password.Generate();
                        string encryPassword = password.GetMD5(simplePassword);

                        conexion.Open();
                        cmd = new SqlCommand("Proc_RecuperarContrasena", conexion);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", partyId);
                        cmd.Parameters.AddWithValue("@contraseña", encryPassword);
                        dataReader = cmd.ExecuteReader();
                        conexion.Close();

                        string mailRecovery = correo.email1;
                        string body = "Anderson Security le remite los datos solicitados" +
                        "\n\n" +
                                      "Clave de acceso: " + simplePassword +
                        "\n\n" +
                        "Por su seguridad no mantenga esta información al alcance de otras personas." +
                        "\n\n" +
                        "Ingresar al sitio web: http://localhost:58055/";
                        string subject = "Recuperación de contraseña";
                        List<string> mailList = new List<string>();
                        mailList.Add(mailRecovery);

                        new EnviarCorreo().enviarCorreo(mailList, subject, body);
                    }
                }
            }
            catch (System.Exception ex)
            {
                HandleError.SaveDataError(ex.Message, ex.StackTrace);
            }
        }
    }
}
