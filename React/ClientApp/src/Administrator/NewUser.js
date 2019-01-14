import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import BlockIcon from '@material-ui/icons/Block';
import AcceptUserIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import '../components/ButtonColor.css';
import { Button, Modal, FormControl } from 'react-bootstrap';


class newUser extends React.Component {

    constructor(props) {
        super();
        this.state = {
            parties: [],
            nombre: "",
            apellido: "",
            partyId: ""
            , rol: ""
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

    usuarioSeleccionado(id) {
        axios.post('http://localhost:44372/api/User/GetNombre', {
            partyid: id
        }).then(res => {
            const usuario = res.data;

            this.setState({
                nombre: usuario.nombre
                , apellido: usuario.primeR_APELLIDO + " " + usuario.segundO_APELLIDO
                , partyid: id
                , rol: 2

            });
        })
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
        axios.get(`http://localhost:44372/api/User/userList`)

            .then(res => {
                var parties = res.data;
                this.setState({ parties: parties });
            })
    }

    DisableUser(id) {
        axios.post(`http://localhost:44372/api/User/Deshabilitar`, {
            partyId: id
        }).then(res => {
            this.setState({ partyid: "" });
        })
    }

    AcceptUser() {
        axios.post(`http://localhost:44372/api/User/Habilitar`, {
            partyId: this.state.partyid,
            rol_usuario: this.state.rol
        }).then(res => {

            this.setState({
                partyid: ""
                , rol: "2"
            });
        })
    }
    render() {
        this.getData()
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
    }
}
export default newUser;
