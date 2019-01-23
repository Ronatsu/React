import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import SearchkIcon from '@material-ui/icons/Search';
//import './Home.css';
import { Link } from "react-router-dom";
import '../components/ButtonColor.css';
import axios from 'axios';
import '../Administrator/Block_User.css';
import $ from 'jquery';

class MisIncidencias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidents: [],
            stateIncident: []
        }
        this.handleChange = this.handleChange.bind(this);

        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }
    componentWillMount() {
        this.DataUpload(0)
        this.ShowSelectIncidentState()
    }

    recragar() {


    }
    DataUpload(IdTypeIncident) {
        axios.post(`http://localhost:44372/api/Incidencia/ObtenerIncidenciasCreadasPor`, {
            email1: 2,
            email2: IdTypeIncident
        }).then(res => {
            const incidents = res.data;
            this.setState({ incidents });
            console.log(res.data)
            console.log("*************")
            console.log(this.state.incidents)
        })
    }
    ShowSelectIncidentState() {
        axios.get(`http://localhost:44372/api/Incidencia/ObtenerEstados`)
            .then(res => {
                const stateIncident = res.data;
                this.setState({ stateIncident });
            })
    }
    handleChange = (event) => {
        this.DataUpload(event.target.value)
    };
    render() {
        
        return (
            <div >
                <Navigation />
                <br /><br /><br /><br />
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
                    <div className="table-responsive" id="main_div">
                        <table className="table table-hover table-condensed " id="table_id">
                            <thead>
                                <tr>
                                    <th className="size" scope="col"></th>
                                    <th className="size" scope="col">Estado</th>
                                    <th className="size" scope="col">Impacto</th>
                                    <th className="size" scope="col">Probabilidad de Impacto</th>
                                    <th className="size" scope="col">Descripción</th>
                                    <th className="size" scope="col">Fecha de Incidencia</th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {this.state.incidents.map(elemento => {
                                    return (
                                        <tr key={elemento.id}>
                                            <td>
                                                < Link to={'/InformacionIncidencia/' + elemento.id + '/' + elemento.estado}><button className="btn btnBlue btn-md" type="submit" ><SearchkIcon />Dar seguimiento</button></Link>
                                            </td>
                                            <td>
                                                {elemento.estado}
                                            </td>
                                            <td>
                                                {elemento.probabilidaImpacto}
                                            </td>
                                            <td>
                                                {elemento.tipoImpacto}
                                            </td>
                                            <td>
                                                {elemento.descripcion}
                                            </td>
                                            <td>
                                                {elemento.fechaIncidencia}
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

} export default MisIncidencias;