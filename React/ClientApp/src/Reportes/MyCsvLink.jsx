import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import '../components/ButtonColor.css';
import axios from 'axios';



class MyCsvLink extends React.Component {
    csvLink = React.createRef()
    state = { data: [], dataa:[] }

  
    /*fetchData = () => {
      fetch('/mydata').then(data => {
        this.setState({ data }, () => {
          // click the CSVLink component to trigger the CSV download
          this.csvLink.current.link.click()
        })
      })
    }
    */

    /*fetchData = () => {
        axios.get(`http://localhost:56461/api/Reporte/ObtenerCsv`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
                this.csvLink.current.link.click()
            })
    }*/

        componentDidMount() {
            axios.get(`https://localhost:44357/api/Reporte/ObtenerCsv`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
             //   this.csvLink.current.link.click()
            })
    }

            down() {
                axios.get(`https://localhost:44357/api/Reporte/ObtenerCsv`)
                    .then(res => {
                        const data = res.data;
                        this.setState({ data });
                        this.csvLink.current.link.click()
                    })
 
}



    render() {



        const columns = [
            { Label: 'asignado', key: 'asignado' },
            { Label: 'FechaDescubrimineto', key: 'FechaDescubrimineto' },
            { Label: 'fechaIncidencia', key: 'fechaIncidencia' },
            { Label: 'fechaResuelto', key: 'fechaResuelto' },
            { Label: 'fechaVerificacion', key: 'fechaVerificacion' },
            { Label: 'metaEstado', key: 'metaEstado' },
            { Label: 'tipoIncidencia', key: 'tipoIncidencia' },
            { Label: 'tipoImpacto', key: 'tipoImpacto' },
            { Label: 'descripcion', key: 'descripcion' },
            { Label: 'metodoDeteccion', key: 'metodoDeteccion' },
        ];

        const file = [];


        {
            this.state.data.map(e => file.push({

                Asignado: e.asignado,
                FechaDescubrimineto: e.fechaDescubrimineto,
                FechaIncidencia: e.fechaIncidencia,
                FechaResuelto: e.fechaResuelto,
                FechaVerificacion: e.fechaVerificacion,
                Estado: e.metaEstado,
                Incidencia: e.tipoIncidencia,
                Impacto: e.tipoImpacto,
                Descripcion: e.descripcion,
                Deteccion: e.metodoDeteccion

            },))
        }

            //this.state.data.map(e => {
                
            //        Asignado =  e.asignado  ,
            //        FechaDescubrimineto,  e.fechaDescubrimineto ,
            //        FechaIncidencia,  e.fechaIncidencia ,
            //        FechaResuelto,  e.fechaResuelto ,
            //        FechaVerificacion,  e.fechaVerificacion ,
            //        Estado,  e.metaEstado ,
            //        Incidencia,  e.tipoIncidencia ,
            //        Impacto,  e.tipoImpacto ,
            //        Descripcion,  e.descripcion ,
            //        Deteccion,  e.metodoDeteccion ,

                
            //})

        


        return (

            <div>
                
                
                {/*
                 * <button className="btn btnBlue" onClick={this.down}>Descargar CSV</button>
                 * 
                 * 

                */}


                {/*
                 * 
                 * 
                 * 
                 * 
                 * 
                 * 
                 * 
                 * 
                 *
                {
                    this.state.data.map(file => <CSVLink className="hidden" target="_blank" filename="Reporte.csv" separator=";" ref={this.csvLink} data={[{ Asignado: file.asignado, FechaDescubrimiento: file.fechaDescubrimiento, FechaIncidencia: file.fechaIncidencia, FechaResuelto: file.fechaResuelto, FechaVerificacion: file.fechaVerificacion, Estado: file.metaEstado, TipoIncidencia: file.tipoIncidencia, TipoImpacto: file.tipoImpacto, Descripcion: file.descripcion, MetodoDeteccion: file.metodoDeteccion },]}
                    />)
                }
                 * 
                 * 
                 * 
                 * 
               
                */}

                {
                    this.state.data.map(file => console.log(file.Asignado))
                }
                

                <CSVLink className="hidden" target="_blank" separator="," filename="Reporte.csv" headers={columns} data={this.state.data}>Download me</CSVLink>

                { /*

                {this.state.data.map(file => this.setState.dataa({ Asignado: file.asignado, FechaDescubrimiento: file.fechaDescubrimiento, FechaIncidencia: file.fechaIncidencia, FechaResuelto: file.fechaResuelto, FechaVerificacion: file.fechaVerificacion, Estado: file.metaEstado, TipoIncidencia: file.tipoIncidencia, TipoImpacto: file.tipoImpacto, Descripcion: file.descripcion, MetodoDeteccion: file.metodoDeteccion },))}


               
               

                <CSVLink
                    data={file}
                        filename="Reporte.csv"
                        columns={columns}
                        className="hidden"
                        separator=";"
                        ref={this.csvLink}
                        target="_blank"
                    />


*/}
                

                {/*<CSVLink
                    data={this.state.data.map(e => [{
                        Asignado: e.asignado,
                        FechaDescubrimineto: e.fechaDescubrimineto,
                        FechaIncidencia: e.fechaIncidencia,
                        FechaResuelto: e.fechaResuelto,
                        FechaVerificacion: e.fechaVerificacion,
                        Estado: e.metaEstado,
                        Incidencia: e.tipoIncidencia,
                        Impacto: e.tipoImpacto,
                        Descripcion: e.descripcion,
                        Deteccion: e.metodoDeteccion,

                    },])}
                    filename="Reporte.csv"
                    columns={columns}
                    className="hidden"
                    separator=";"
                    ref={this.csvLink}
                    target="_blank"
                />*/}



             
          </div>


      )
    }
  }


  export default MyCsvLink;