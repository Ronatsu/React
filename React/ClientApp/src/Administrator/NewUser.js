import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import BlockIcon from '@material-ui/icons/Block';
import AcceptUserIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import '../components/ButtonColor.css';

class newUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parties: []
        }

        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }

    getData() {
        axios.get(`http://localhost:44372/api/User/userList`)

            .then(res => {
                var parties = res.data;
                this.setState({ parties: parties });
            })
    }
    componentWillMount() {
        this.getData();
    } 
    componentDidUpdate(prevProps, prevState) {
        if (prevState.parties !== this.state.parties) {
            this.getData();
        }
    }
    DisableUser(id) {
        axios.post(`http://localhost:44372/api/User/Deshabilitar`, {
            partyId: id,
        });
    }

    AcceptUser(id) {
        axios.post(`http://localhost:44372/api/User/Habilitar`, {
            partyId: id,
        });
    }
    render() {
       
        return (
            <div className="container ">
                <Navigation />
                <br />
                <br />
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
                                        <td><button class="btn btnGreen" type="submit" onClick={() => this.AcceptUser(elemento.partyid)}><AcceptUserIcon />  Aceptar</button>
                                            <button class="btn btnRed" type="submit" onClick={() => this.DisableUser(elemento.partyid)} ><BlockIcon />  Rechazar</button></td>
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
export default newUser;
