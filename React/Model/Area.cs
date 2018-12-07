using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Model
{
    public class Area
    {
        public int AreaID { get; set; }
        public string NombreArea { get; set; }
        public int TecnologiaFk { get; set; }
        public int AreaFk { get; set; }

        public Area()
        {

        }
    }
}
