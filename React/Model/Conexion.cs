

namespace API_Ejemplo.Model
{
    public class Conexion
    {

        private const string ConnectionString = "Data Source=DESKTOP-BHT6OTN\\SQLSERVER2017;" +
                                  "Initial Catalog=ProyectoAnderson;" +
                                  "Integrated security=True;";

        public Conexion()
        {

        }

        public string getConnection()
        {
            return ConnectionString;
        }

    }
}
