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
            email1: '5'
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
        axios.post(`https://localhost:44372/api/GetIncidents/MethodGetIncidents`, {
            email1: this.state.email1,
        }).then(res => {
            const incidents = res.data;
            this.setState({ incidents });
        })



        

    }

    render() {
        return (
            <div >
                <Navigation />
                <div className="container">
                    <br /><br />
                    <a>{this.props.partyId} "holi"</a>
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
            </div>
        );
    }

}

export default Home;
