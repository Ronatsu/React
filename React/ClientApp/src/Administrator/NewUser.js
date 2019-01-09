import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import BlockIcon from '@material-ui/icons/Block';
import AcceptUserIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import '../components/ButtonColor.css';
import AuthService from '../components/AuthService';
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';

class newUser extends React.Component {

    constructor(props) {
        super();
        this.state = {
            parties: [],
            partyId: ""
        }
        this.Auth = new AuthService();
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

    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
        this.handleChange = this.handleChange.bind(this);
    }

    getData() {
        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44331/api/User/userList`, { headers: { "Authorization": headerOptions } })

            .then(res => {
                var parties = res.data;
                this.setState({ parties: parties });
            })
    }

    DisableUser(id) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44331/api/User/Deshabilitar`,
            {
                partyId: id,
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        )
    }

    AcceptUser(id) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44331/api/User/Habilitar`,
            {
                partyId: id,
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        )
    }
    render() {
        this.getData()
        if (this.Auth.isAdmin()) {
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
        } else {
            return (
                <div>
                    <div className="container" id="midle">
                        <div className="row">
                            <div className=" col-md-2 mb-3">
                            </div>
                            <div className="form-inline col-md-10 mb-3" >
                                <div >
                                    <h1 id="title"><strong >UPSSS...</strong></h1>
                                    <h3 >Lo sentimos, no cuentas con los permisos necesarios para ingresar en esta área.</h3>
                                </div>
                                <div>
                                    <ChartIcon id="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="page-footer" id="footererror">
                        <Footer />
                    </footer>
                </div>
            )

        }
    }
}
export default newUser;
