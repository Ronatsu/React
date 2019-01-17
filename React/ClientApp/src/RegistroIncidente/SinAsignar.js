import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import SearchkIcon from '@material-ui/icons/Search';
import $ from 'jquery';
import { Link } from "react-router-dom";
import '../components/ButtonColor.css';
import axios from 'axios'
import '../Administrator/Block_User.css';
import AuthService from '../components/AuthService';
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';

class SinAsignar extends Component {
    constructor(props) {
        super();
        this.state = {
            incidents: []
        }
        this.Auth = new AuthService();
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

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44357/api/Incidencia/IncidenciasSinAsignar`, { headers: { "Authorization": headerOptions } })
            .then(res => {
                const incidents = res.data;
                this.setState({ incidents });
            })
    }

    recargar() {
        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44357/api/Incidencia/IncidenciasSinAsignar`, { headers: { "Authorization": headerOptions } })
            .then(res => {
                const incidents = res.data;
                this.setState({ incidents });
            })
    }
    render() {
        return (
            <div >
                <Navigation />
                <div className="container">
                    <br /><br /><br /><br />
                    <div className="w-auto p-3">
                        <input className="form-control " type="text" id="inputSearch" placeholder="Buscar"></input>
                    </div>
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
                                        <tr>
                                            <td> <Link to={'/AsignacionIncidencia/' + elemento.id}><button className="btn btnBlue btn-md  " type="submit" ><SearchkIcon />Asignar</button></Link></td>
                                            <th scope="row">{elemento.probabilidaImpacto}</th>
                                            <td>{elemento.tipoImpacto}</td>
                                            <td>{elemento.descripcion}</td>
                                            <td>{elemento.fechaIncidencia}</td>
                                        </tr>

                                    )
                                })};
                            </tbody>
                        </table>
                    </div>
                </div>
                <br /> <br /> <br />
            </div>
        );
    }
}

export default SinAsignar;
