import React from "react";
import { CSVLink, CSVDownload } from "react-csv";



class MyCsvLink extends React.Component {
    csvLink = React.createRef()
    state = { data: [] }
  
    fetchData = () => {
      fetch('/mydata').then(data => {
        this.setState({ data }, () => {
          // click the CSVLink component to trigger the CSV download
          this.csvLink.current.link.click()
        })
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
          <button onClick={this.fetchData}>Download CSV</button>
  
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