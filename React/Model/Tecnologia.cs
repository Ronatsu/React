using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Model
{
    public class Tecnologia
    {
        public string TecnologiaId { get; set; }
        public string NombreTecnologia { get; set; }
        public int TipoTecnologiaFk { get; set; }
        public char CriticoS_N { get; set; }
        public string TipoTecnologiaNombre { get; set; }
    }
}
