

namespace API_Ejemplo.Model
{
    public class Conexion
    {

        private const string ConnectionString = "Data Source=DESKTOP-TRM5G9B\\RON2017_DEAMON;" +
                                  "Initial Catalog=ProyectoAnderson;" +
                                  "Integrated security=True;";

        public Conexion() {

        }

        public string getConnection()
        {
            return ConnectionString;
        }

    }
}
