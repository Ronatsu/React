

namespace API_Ejemplo.Model
{
    public class Conexion
    {

        private const string connectionString = "Data Source=DESKTOP-22D0PS6\\SQL2017_BELCEBU;" +
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
