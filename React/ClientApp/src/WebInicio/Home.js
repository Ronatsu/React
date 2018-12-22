import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import SearchkIcon from '@material-ui/icons/Search';
import $ from 'jquery';
import './Home.css';
import { Link } from "react-router-dom";
import '../components/ButtonColor.css';
import axios from 'axios'
import '../Administrator/Block_User.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidents: [],
            email1: '5',
            email2: '',
            stateIncident: []
        }
        this.handleChange = this.handleChange.bind(this);
        $(document).ready(function () {
            $("#inputSearch").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }
    componentWillMount() {
        this.carga()
    }
    carga() {
        axios.post(`http://localhost:44372/api/GetIncidents/MethodGetIncidents`, {
            email1: this.state.email1,
            email2: this.state.email2
        }).then(res => {
            const incidents = res.data;
            this.setState({ incidents });
        })
        this.ShowSelectIncidentState()
    }
    ShowSelectIncidentState() {
        axios.get(`http://localhost:44372/api/GetIncidents/MethodGetStateIncident`)
            .then(res => {
                const stateIncident = res.data;
                this.setState({ stateIncident });
            })
    }
    handleChange = (event) => {   
        this.setState({ email2: event.target.value });
        this.carga()
    };
    render() {
        return (
            <div >
                <Navigation />
                <div className="container">
                    <br /><br />
                    <div className="row">
                        <div className="col-md-4">
                            <input className="form-control" type="text" id="inputSearch" placeholder="Buscar"></input>
                        </div>
                        <div className="col-md-4">
                            <select className="form-control" onChange={this.handleChange}>
                                {this.state.stateIncident.map(elemento => {
                                    return (
                                        <option value={elemento.email2}>{elemento.email1}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="container table-responsive " id="main_div">
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
                                        <tr key={elemento.dateIncident}>
                                            <td> <Link to="/InformacionIncidencia"><button className="btn btnBlue btn-md  " type="submit" ><SearchkIcon />Dar seguimiento</button></Link></td>
                                            <th scope="row">{elemento.impactProbability}</th>
                                            <td>{elemento.impactType}</td>
                                            <td>{elemento.description}</td>
                                            <td>{elemento.dateIncident}</td>
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

export default Home;
