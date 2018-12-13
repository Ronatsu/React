using System;

namespace React.Model
{
    public class Incident
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaIncidencia { get; set; }
        public DateTime FechaDescubrimiento { get; set; }
        public DateTime FechaVerificacion { get; set; }
        public DateTime FechaResuelto { get; set; }
        public DateTime FechaRecovery { get; set; }
        public string TipoIncidencia { get; set; }
        public string TipoImpacto { get; set; }
        public string MetodoDeteccion { get; set; }
        public string GradoControl { get; set; }
        public string Estado { get; set; }
        public string AreaAfectada { get; set; }

    }
}
