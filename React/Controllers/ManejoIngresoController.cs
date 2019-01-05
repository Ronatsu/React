using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API_Ejemplo.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManejoIngresoController : ControllerBase
    {
        // GET: api/ManejoIngreso

        String connectionString = new Conexion().getConnection();
        SqlConnection conexion;
        SqlCommand cmd;
        SqlDataReader dataReader;


        readonly IConfiguration Configuration;
        public ManejoIngresoController(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }


        //[Route("Create")]
        //[HttpPost]
        //public async Task<IActionResult> CreateUser([FromBody] Usuario model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        //aqui esta hardcode pero en base a si se creo o no el user se le da un token
                
        //        if (!user.UserName.Trim().Equals("") && !user.Email.Trim().Equals(""))
        //        {
        //            return BuildToken(model);
        //        }
        //        else
        //        {
        //            return BadRequest("Username or password invalid");
        //        }
        //    }
        //    else
        //    {
        //        return BadRequest(ModelState);
        //    }

        //}

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Usuario userInfo)
        {
            if (ModelState.IsValid)
            {
                conexion = new SqlConnection(connectionString);
                conexion.Open();

                cmd = new SqlCommand("Proc_ValidarLogin", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EMAIL", userInfo.email);
                cmd.Parameters.AddWithValue("@PASSWORD", userInfo.password1);

                dataReader = cmd.ExecuteReader();
                
                if (dataReader.Read())
                {
                    conexion.Close();
                    return BuildToken(userInfo);
                }
                else
                {
                    conexion.Close();
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return BadRequest(ModelState);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        private IActionResult BuildToken(Usuario userInfo)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("role", "user")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["ApiAuth:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expirationTime = DateTime.UtcNow.AddHours(1);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: Configuration["ApiAuth:Issuer"],
               audience: Configuration["ApiAuth:Audience"],
               claims: claims,
               expires: expirationTime,
               signingCredentials: creds);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = expirationTime
            });

        }
    }
}
