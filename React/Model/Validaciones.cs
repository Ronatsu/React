using System;
using System.Text.RegularExpressions;
using System.Security.Cryptography;
using System.Text;

namespace API_Ejemplo.Model
{
    public class Validaciones
    {
        private Regex regex = new Regex("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,15}[^'\\s]/ ");
        private MD5 md5;

        public bool validarContrasena(String contrasena)
        {
            if (contrasena.Length>=8)
            {
                return regex.IsMatch(contrasena);
            }
 
            return false;
        }

        public string encriptarContrasena(String contrasena)
        {
            md5 = MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(contrasena);
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < hashBytes.Length; i++)
            {
                sb.Append(hashBytes[i].ToString("X2"));
            }
            return sb.ToString();
        }


    }
}
