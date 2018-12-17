import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import '../Administrator/Block_User.css';
import Navigation from '../components/Navigation';
import Search from '@material-ui/icons/Search';
import '../components/ButtonColor.css';
import axios from 'axios';

class SelectUserIncident extends React.Component {

    constructor(props) {
        super();
        this.state = {
            parties: []
        }

        super(props);

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
        axios.get(`https://localhost:44372/api/User/GetAllUsers`)
            .then(res => {
                var parties = res.data;
                this.setState({ parties });
            })
    }

    render() {
        return (
            <div className="container ">
                <Navigation />
                <br />
                <br />
                <div id="show"></div>
                <div className="w-auto p-3">
                    <input className="form-control" id="myInput" type="text" placeholder="Buscar"></input>
                </div>
                <div className="container table-responsive " id="main_div">
                    <table className="table table-hover table-condensed " id="table_id">
                        <thead>
                            <tr>
                                <th className="size" scope="col">Nombre</th>
                                <th className="size" scope="col">Primer Apellido</th>
                                <th className="size" scope="col">Segundo Apellido</th>
                                <th className="size" scope="col">Correo Electrónico</th>
                                <th className="size" scope="col">Rol</th>
                                <th className="size" scope="col"></th>

                            </tr>
                        </thead>
                        <tbody id="myTable">
                            {this.state.parties.map(elemento => {
                                return (
                                    <tr key={elemento.partyid}>
                                        <td scope="row">{elemento.nombre}</td>
                                        <td>{elemento.primeR_APELLIDO}</td>
                                        <td>{elemento.segundO_APELLIDO}</td>
                                        <td name="emial">{elemento.correoElectronico}</td>
                                        <td>{elemento.roL_USUARIO}</td>
                                        <td><Link to="/TableUserList"><button className="btn btnBlue  " type="submit"><Search /> Ver Incidencias</button></Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default SelectUserIncident;
