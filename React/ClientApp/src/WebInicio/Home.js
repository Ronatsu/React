import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import { incidents } from '../components/bd/incident.json';
import SearchkIcon from '@material-ui/icons/Search';
import $ from 'jquery';
import './Home.css';
import { Link } from "react-router-dom";
import '../components/ButtonColor.css';
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            incidents
        }

        super(props);

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
        axios.get(`https://localhost:44372/api/GetIncidents/MethodGetIncidents`)
            .then(res => {
                const incidents = res.data;
                this.setState({ incidents });
            })
    }
    render() {
        const incidentCard = this.state.incidents.map((incident) => {
            return (
                <tr>
                    <td>  <Link to="/InformacionIncidencia"><button class="btn btnBlue btn-md  " type="submit" ><SearchkIcon />Dar seguimiento</button></Link></td>
                    <th scope="row">{incident.ImpactProbability}</th>
                    <td>{incident.ImpactType}</td>
                    <td>{incident.Description}</td>
                    <td>{incident.DateIncident}</td>
                </tr>

            )
        })
        return (
            <div >
                <Navigation />
                <div className="container">
                    <br /><br /><br /><br />
                    <div className="w-auto p-3">
                        <input className="form-control " type="text" id="inputSearch" placeholder="Buscar"></input>
                    </div>
                    <div className="row ">
                        <div className="col  ">
                            <div className="container table-responsive " id="main_div">
                                <table className="table table-hover table-condensed " id="table_id">
                                    <thead>

                                        <tr>
                                            <th>
                                            </th>
                                            <th>Impacto</th>
                                            <th >Probabilidad de Impacto </th>
                                            <th >Descripción </th>
                                            <th >Fecha de Incidencia </th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">

                                        {incidentCard}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;
