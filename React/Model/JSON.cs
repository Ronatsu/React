using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;

namespace React.Model
{
    public class JSON
    {
        public void SaveDataError(string error, string errorInfo)
        {
            string path = @"C:\Users\Ronald Alfaro H\Documents\error_ANDERSON.json";
            if (File.Exists(path))
            {
                SaveDataJSON(error, errorInfo, path, CurrentData(path));
            }
            else
            {
                SaveDataJSON(error, errorInfo, path, new List<JSONData>());
            }

        }

        private List<JSONData> CurrentData(string path)
        {
            using (StreamReader file = File.OpenText(path))
            {

                JsonSerializer serializer = new JsonSerializer();
                List<JSONData> currentData = (List<JSONData>)serializer.Deserialize(file, typeof(List<JSONData>));
                return currentData;
            }
        }
        private void SaveDataJSON(string error, string errorInfo, string path, List<JSONData> jsonData)
        {

            int id = 0;

            if (!(jsonData == null || jsonData.Count == 0))
            {
                id = jsonData.Last().IdError + 1;
            }
            JSONData data = new JSONData
            {
                IdError = id,
                Error = error,
                ErrorInfo = errorInfo,
                Date = DateTime.Now.ToString("G")
            };

            jsonData.Add(data);

            string json = JsonConvert.SerializeObject(jsonData, Formatting.Indented);

            try
            {
                File.WriteAllText(path, json);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
