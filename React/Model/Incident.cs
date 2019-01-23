using System.Collections.Generic;



namespace React.Model
{
    public class Incidencia
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string AsignadaA { get; set; }
        public string AsignadaPor { get; set; }
        public string FechaIncidencia { get; set; }
        public string FechaDescubrimiento { get; set; }
        public string FechaVerificacion { get; set; }
        public string FechaResuelto { get; set; }
        public string FechaRecovery { get; set; }
        public string TipoIncidencia { get; set; }
        public string TipoImpacto { get; set; }
        public string ProbabilidaImpacto { get; set; }
        public string MetodoDeteccion { get; set; }
        public string GradoControl { get; set; }
        public string Estado { get; set; }
        public string EstadoFk { get; set; }
        public string AreaAfectada { get; set; }
        public List<string> AreaData { get; set; }
        public List<string> TecnologiaData { get; set; }
        public List<TipoIncidencia> StepsData { get; set; }

    }
}
