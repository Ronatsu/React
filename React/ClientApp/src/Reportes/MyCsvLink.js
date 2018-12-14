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
        axios.get(`http://localhost:56461/api/Reporte/ObtenerCsv`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
                this.csvLink.current.link.click()
            })
    }
  
    render() {
        const columns = [{
            id: 'first',
            displayName: 'First column'
          }, {
            id: 'second',
            displayName: 'Second column'
          }];
         
          const datas = [{
            first: 'foo',
            second: 'bar'
          }, {
            first: 'foobar',
            second: 'foobar'
          }];
          
      return (
        <div>
          <button className="btn btnBlue" onClick={this.fetchData}>Descargar CSV</button>

              {/*this.state.incidents.map(incident => <ColumnSeries name={incident.mes} data={[{ name: incident.mes, y: incident.cantidadIncidentes },]}
              />)*/}
              {/*this.state.incidents.map(incident => <CSVLink columns={incident.mes} data={[{ name: incident.mes, y: incident.cantidadIncidentes },]}
                  />)*/} 

          <CSVLink
            data={datas}
            separator=";"
            columns={columns}
            filename="data.csv"
            className="hidden"
            ref={this.csvLink}
            target="_blank" 
         />
      </div>
      )
    }
  }


  export default MyCsvLink;