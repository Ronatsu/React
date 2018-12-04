

namespace API_Ejemplo.Model
{
    public class Conexion
    {

        private const string connectionString = "Data Source=DESKTOP-D684D39\\SQL2017_DEV;" +
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
