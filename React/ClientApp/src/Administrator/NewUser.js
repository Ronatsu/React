import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import BlockIcon from '@material-ui/icons/Block';
import AcceptUserIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import '../components/ButtonColor.css';
import { Button, Modal, FormControl } from 'react-bootstrap';
import AuthService from '../components/AuthService';
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';


class newUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parties: [],
            nombre: '',
            apellido: '',
            partyId: '',
            rol: '',
            email: ''
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

    usuarioSeleccionado(id) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post('http://localhost:44372/api/User/GetNombre',
            {
                partyid: id
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        ).then(res => {
            const usuario = res.data;

            this.setState({
                nombre: usuario.nombre
                , apellido: usuario.primeR_APELLIDO + " " + usuario.segundO_APELLIDO
                , partyid: id
                , rol: 2
                , email: mailUser
            });
        })
    }
    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
    }

    getData() {
        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44357/api/User/userList`, { headers: { "Authorization": headerOptions } })

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

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`http://localhost:44372/api/User/Deshabilitar`,
            {
                partyId: id
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        ).then(res => {
            this.setState({ partyid: "" });
        })
    }

    AcceptUser() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`http://localhost:44372/api/User/Habilitar`,
            {
                partyId: this.state.partyid,
                rol_usuario: this.state.rol
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        ).then(res => {

            this.setState({
                partyid: ""
                , rol: "2"
            });
        })
    }
    render() {
       
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
                                            <td><button class="btn btnGreen" type="submit" data-toggle="modal" href="#modalAceptar" onClick={() => this.usuarioSeleccionado(elemento.partyid)}><AcceptUserIcon />  Aceptar</button>

                                                <button class="btn btnRed" type="submit" data-toggle="modal" href="#modalRechazar" onClick={() => this.usuarioSeleccionado(elemento.partyid)}><BlockIcon />  Rechazar</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="col-md-6 mb-3 pagination justify-content-end">
                            <div id="modalRechazar" className="modal fade in">
                                <Modal.Dialog>
                                    <Modal.Header>
                                        <Modal.Title id="titleModal">
                                            <h3 id="txtModal">
                                                Rechazar este usuario
                                        </h3>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="form-group">
                                            <p id="txtModal">¿Estás seguro de querer rechazar a {this.state.nombre} {this.state.apellido}?</p>
                                            <p id="txtModal" ALIGN="justify">Una vez rechazado este usuario no podrá enviar de nuevo la solicitud, pero es posible habilitarlo desde la página de "Administrar usuarios".</p>

                                        </div>

                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button id="close" className="btnGray" data-dismiss="modal">Cancelar</Button>
                                        <Button id="close" className="btnBlue" data-dismiss="modal" onClick={() => this.DisableUser(this.state.partyid)}>Aceptar</Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </div>
                        </div>

                        <div className="col-md-6 mb-3 pagination justify-content-end">
                            <div id="modalAceptar" className="modal fade in">
                                <Modal.Dialog>
                                    <Modal.Header>
                                        <Modal.Title id="titleModal">
                                            <h3 id="txtModal">
                                                Aceptar este usuario
                                        </h3>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="form-group">
                                            <p id="txtModal">¿Estás seguro de querer aceptar a {this.state.nombre} {this.state.apellido}?</p>
                                            <p id="txtModal" ALIGN="justify">Para poder acpetar el siguiente usario es debes asignarle un rol.</p>

                                        </div>


                                        <div className="form-group">
                                            <label id="txtModal">Rol</label>
                                            <select className="form-control container" name="rol" onChange={this.handleChange}>
                                                <option value="2">Usuario</option>
                                                <option value="1" >Administrador</option>
                                            </select>
                                        </div>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button id="close" className="btnGray" data-dismiss="modal">Cancelar</Button>
                                        <Button id="close" className="btnBlue" data-dismiss="modal" onClick={() => this.AcceptUser()}>Aceptar</Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </div>
                        </div>
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
