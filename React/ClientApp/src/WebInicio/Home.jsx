import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import SearchkIcon from '@material-ui/icons/Search';
import './Home.css';
import { Link } from "react-router-dom";
import '../components/ButtonColor.css';
import axios from 'axios'
import '../Administrator/Block_User.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import AuthService from '../components/AuthService';
/*const options = {
    onRowClick: function (row) {
        return (`${row.id}`);
    }
};*/

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidents: [],
            email1: ChooseParty(this.props.idParty),
            stateIncident: [],
            row: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.hh = this.hh.bind(this);
        this.Auth = new AuthService();
    }
    hh = (event) => {
        const options = {
            onRowClick: function (row) {
                alert(`${row.idIncidencia}`);
                this.setState({ row: `${row.idIncidencia}` });
            }
        };
        return options;
    }
    //GetRow() {
    //    return {
    //        mode: 'radio',
    //        clickToSelect: true,
    //        hideSelectColumn: true,
    //        onSelect: this.onSelectRow.bind(this)
    //    };
    //}
    //onSelectRow(row, isSelected, e) {
    //    if (isSelected) {
    //        this.setState({ row: `${row['idIncidencia']}` });
    //    }
    //}
    componentWillMount() {
        this.DataUpload(0)
        this.ShowSelectIncidentState()
    }
    DataUpload(IdTypeIncident) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/GetIncidents/MethodGetIncidents`,
            {
                email1: this.state.email1,
                email2: IdTypeIncident
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        ).then(res => {
            const incidents = res.data;
            this.setState({ incidents });
        })
    }
    ShowSelectIncidentState() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44357/api/GetIncidents/MethodGetStateIncident`, { headers: { "Authorization": headerOptions } })
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
            < Link to={'/InformacionIncidencia/' + this.state.row}><button className="btn btnBlue btn-md" type="submit" ><SearchkIcon />Dar seguimiento</button></Link>
        )
    }

    render() {
        return (
            <div >
                <Navigation />
                <br /><br /><br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text" className="form-control" id="myInput" placeholder="Buscar" />
                        </div>
                        <div className="col-md-4">
                            <select className="form-control" onChange={this.handleChange}>
                                <option value="0" selected >Todas</option>
                                {this.state.stateIncident.map(elemento => {
                                    return (
                                        <option value={elemento.email2}>{elemento.email1}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="container table-responsive" id="main_div">
                        <table className="table table-hover table-condensed " id="table_id">
                            <thead>
                                <tr>
                                    <th className="size" scope="col"></th>
                                    <th className="size" scope="col">Impacto</th>
                                    <th className="size" scope="col">Probabilidad de Impacto</th>
                                    <th className="size" scope="col">Descripción</th>
                                    <th className="size" scope="col">Fecha de Incidencia</th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {this.state.incidents.map(elemento => {
                                    return (
                                        <tr key={elemento.idIncidencia}>
                                            <td>
                                                < Link to={'/InformacionIncidencia/' + elemento.idIncidencia}><button className="btn btnBlue btn-md" type="submit" ><SearchkIcon />Dar seguimiento</button></Link>
                                            </td>
                                            <td>
                                                {elemento.impactProbability}
                                            </td>
                                            <td>
                                                {elemento.impactType}
                                            </td>
                                            <td>
                                                {elemento.description}
                                            </td>
                                            <td>
                                                {elemento.dateIncident}
                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

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
/* <BootstrapTable options={this.hh()} data={this.state.incidents} search hover striped version='4' pagination id="myTable" className="table table-borderless" >
                            <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} />
                            <TableHeaderColumn dataField='impactProbability'>Impacto</TableHeaderColumn>
                            <TableHeaderColumn dataField='impactType'>Probabilidad de Impacto</TableHeaderColumn>
                            <TableHeaderColumn dataField='description'>Descripción</TableHeaderColumn>
                            <TableHeaderColumn dataField='dateIncident' isKey>Fecha de Incidencia</TableHeaderColumn>
                        </BootstrapTable>*/