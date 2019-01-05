using React.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API_Ejemplo.Model
{
    public class Usuario
    {
        public Usuario()
        {

        }

        public string PARTYID { get; set; }
        public string email { get; set; }
        public string NOMBRE { get; set; }
        public string PRIMER_APELLIDO { get; set; }
        public string SEGUNDO_APELLIDO { get; set; }
        public Boolean HABILITADO { get; set; }
        public string password1 { get; set; }
        public string password2 { get; set; }
        public string passwordActual { get; set; }
        public char TIPO_COLABORADOR { get; set; }
        public string ROL_USUARIO { get; set; }
        public string ASIGNA_INCIDENCIA { get; set; }
        public string correoElectronico { get; set; }
        public List<Asignacion> AsignacionArray { get; set; }
    
    }
  
}
