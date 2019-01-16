using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Model
{
    public class IncidenciaMes
    {

        public string Mes { get; set; }
        public int CantidadIncidentes { get; set; }

        public IncidenciaMes()
        {

        }

        public void setValueMonth(String month) {

            int monthParse = Convert.ToInt32(month);

            if (monthParse > 0 && monthParse <= 12)
            {
                if (monthParse == 1)
                {
                    this.Mes = "Enero";
                }
                else if (monthParse == 2)
                {
                    this.Mes = "Febrero";
                }
                else if (monthParse == 3)
                {
                    this.Mes = "Marzo";
                }
                else if (monthParse == 4)
                {
                    this.Mes = "Abril";
                }
                else if (monthParse == 5)
                {
                    this.Mes = "Mayo";
                }
                else if (monthParse == 6)
                {
                    this.Mes = "Junio";
                }
                else if (monthParse == 7)
                {
                    this.Mes = "Julio";
                }
                else if (monthParse == 8)
                {
                    this.Mes = "Agosto";
                }
                else if (monthParse == 9)
                {
                    this.Mes = "Setiembre";
                }
                else if (monthParse == 10)
                {
                    this.Mes = "Octubre";
                }
                else if (monthParse == 11)
                {
                    this.Mes = "Noviembre";
                }
                else {
                    this.Mes = "Diciembre";
                }

            }

        }
    }
}
