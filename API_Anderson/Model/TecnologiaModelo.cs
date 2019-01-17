using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Ejemplo.Model
{
    public class TecnologiaModelo
    {
        public TecnologiaModelo()
        {

        }
        public int TecnologiaId { get; set; }
        public String NombreTecnologia { get; set; }
        public Char Critico_S_N { get; set; }
        public Char TipoTecnologia_H_S { get; set; }
    }
}
