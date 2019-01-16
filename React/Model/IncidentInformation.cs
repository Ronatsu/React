using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Model
{
    public class IncidentInformation
    {
        public string TipoIncidencia { get; set; }
        public string AsignadaA { get; set; }
        public string AsignadaPor { get; set; }

        public string ProbabilidadImpacto { get; set; }
        public string MetaEstado { get; set; }
        public string FechaInicidencia { get; set; }
        public string FechaDescubrimiento { get; set; }
        public string FechaVerificacion { get; set; }
        public string TipoImpacto { get; set; }
        public string GradoControl { get; set; }
        public int IncidenciaID { get; set; }
        public string Descripcion { get; set; }
        public List<string> AreaData { get; set; }
        public List<string> TecnologiaData { get; set; }
        public List<TipoIncidencia> StepsData { get; set; }
    }
}
