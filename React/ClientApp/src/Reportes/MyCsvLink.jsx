import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import '../components/ButtonColor.css';
import axios from 'axios';



class MyCsvLink extends React.Component {
    csvLink = React.createRef()
    state = { data: [] }
  
    /*fetchData = () => {
      fetch('/mydata').then(data => {
        this.setState({ data }, () => {
          // click the CSVLink component to trigger the CSV download
          this.csvLink.current.link.click()
        })
      })
    }*/

    componentDidMount() {
        axios.get(`http://localhost:58055/api/Reporte/ObtenerCsv`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
                this.csvLink.current.link.click()
            })
        console.log(this.state.data)
    }
  
    render() {      
      return (
        <div>
              <button className="btn btnBlue" onClick={this.fetchData}>Descargar CSV</button>
              {this.state.data.map(file => <CSVLink className="hidden" target="_blank" filename="Reporte.csv" separator=";" ref={this.csvLink} data={[{ Asignado: file.asignado, FechaDescubrimiento: file.fechaDescubrimiento, FechaIncidencia: file.fechaIncidencia, FechaResuelto: file.fechaResuelto, FechaVerificacion: file.fechaVerificacion, Estado: file.metaEstado, TipoIncidencia: file.tipoIncidencia, TipoImpacto: file.tipoImpacto, Descripcion: file.descripcion, MetodoDeteccion: file.metodoDeteccion }]}
                  />)}
      </div>
      )
    }
  }


  export default MyCsvLink;