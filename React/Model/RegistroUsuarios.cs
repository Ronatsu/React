﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Ejemplo.Model
{
    public class RegistroUsuarios
    {
        public RegistroUsuarios()
        {

        }

        public string PARTYID { get; set; }
        public string EMAIL { get; set; }
        public string NOMBRE { get; set; }
        public string PRIMER_APELLIDO { get; set; }
        public string SEGUNDO_APELLIDO { get; set; }
        public Boolean HABILITADO { get; set; }
        public string CONTRASEÑA { get; set; }
        public char TIPO_COLABORADOR { get; set; }
        public string ROL_USUARIO { get; set; }
        public string ASIGNA_INCIDENCIA { get; set; }
    }
}