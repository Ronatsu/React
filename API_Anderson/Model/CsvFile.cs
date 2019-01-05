using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Model
{
    public class CsvFile
    {
        public string Asignado { get; set; }
        public string FechaDescubrimiento { get; set; }
        public string FechaIncidencia { get; set; }
        public string FechaResuelto { get; set; }
        public string FechaVerificacion { get; set; }
        public string MetaEstado { get; set; }
        public string TipoIncidencia { get; set; }
        public string TipoImpacto { get; set; }
        public string Descripcion { get; set; }
        public string MetodoDeteccion { get; set; }
    }
}
