import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import SearchkIcon from '@material-ui/icons/Search';
import './Home.css';
import { Link } from "react-router-dom";
import '../components/ButtonColor.css';
import axios from 'axios'
import '../Administrator/Block_User.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



const options = {
    onRowClick: function (row) {
        alert(`You click row id: ${row.id}`);
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidents: [],
            email1: ChooseParty(this.props.idParty),
            stateIncident: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.DataUpload(18)
        this.ShowSelectIncidentState()
    }
    DataUpload(IdTypeIncident) {
        axios.post(`http://localhost:44372/api/GetIncidents/MethodGetIncidents`, {
            email1: this.state.email1,
            email2: IdTypeIncident
        }).then(res => {
            const incidents = res.data;
            this.setState({ incidents });
        })
    }
    ShowSelectIncidentState() {
        axios.get(`http://localhost:44372/api/GetIncidents/MethodGetStateIncident`)
            .then(res => {
                const stateIncident = res.data;
                this.setState({ stateIncident });
            })
    }
    handleChange = (event) => {
        this.DataUpload(event.target.value)
    };

    cellButton() {
        return (
            <Link to="/InformacionIncidencia"><button className="btn btnBlue btn-md  " type="submit" ><SearchkIcon />Dar seguimiento</button></Link>
        )
    }

    render() {
        return (
            <div >
                <Navigation />
                <br /><br /><br />
                <div className="container">
                    <div className="col-md-4">
                        <select className="form-control" onChange={this.handleChange}>
                            <option selected disabled>Asignada</option>
                            {this.state.stateIncident.map(elemento => {
                                return (
                                    <option value={elemento.email2}>{elemento.email1}</option>
                                )
                            })}
                        </select>
                    </div>
                    <br />
                    <div className="container table-responsive" id="main_div">
                        <BootstrapTable options={options} data={this.state.incidents} search hover striped version='4' pagination id="myTable" className="table table-borderless" >
                            <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} />
                            <TableHeaderColumn dataField='id' hidden isKey />
                            <TableHeaderColumn dataField='impactProbability'>Impacto</TableHeaderColumn>
                            <TableHeaderColumn dataField='impactType'>Probabilidad de Impacto</TableHeaderColumn>
                            <TableHeaderColumn dataField='description'>Descripción</TableHeaderColumn>
                            <TableHeaderColumn dataField='dateIncident'>Fecha de Incidencia</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <br /> <br /> <br />
            </div>
        );
    }

}
function ChooseParty(partyID) {
    if (partyID == undefined || partyID == null || partyID == 0) {
        return 5;
    } else {
        return partyID;
    }
}
export default Home;
