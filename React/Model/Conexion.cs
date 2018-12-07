

namespace API_Ejemplo.Model
{
    public class Conexion
    {

        private const string connectionString = "Data Source=DESKTOP-OR6ATOD\\SQLSERVER2017DEV;" +
                                         "Initial Catalog=ProyectoAnderson;" +
                                        "Integrated security=True;";

        public Conexion() {

        }

        public string getConnection()
        {
            return connectionString;
        }

     


    }
}
