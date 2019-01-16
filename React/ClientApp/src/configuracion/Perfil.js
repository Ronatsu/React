import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';
import '../components/ButtonColor.css';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { Button, Modal, FormControl } from 'react-bootstrap';
import AuthService from '../components/AuthService';



class AjustesPerfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            partyId: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            nombreNuevo: '',
            primerApellidoNuevo: '',
            segundoApellidoNuevo: '',
            password1: '',
            password2: '',
            passwordActual: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
    }
    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmitName() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/User/CambiarNombre`,
            {
                partyId: this.Auth.getIDUser(),
                nombre: this.state.nombreNuevo,
                primer_apellido: this.state.primerApellidoNuevo,
                segundo_apellido: this.state.segundoApellidoNuevo

            },
            {
                headers: { 'Authorization': headerOptions }
            }

        )
        this.setState({
            nombre: this.state.nombreNuevo
        });
        this.state.primerApellido = this.state.primerApellidoNuevo
        this.state.segundoApellido = this.state.segundoApellidoNuevo
    }

    handleSubmitPass() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/User/CambiarContraseña`,
            {
                partyId: this.Auth.getIDUser(),
                password1: this.state.password1,
                password2: this.state.password2,
                passwordActual: this.state.passwordActual

            },
            {
                headers: { 'Authorization': headerOptions }
            }
        )
    }
    handleSubmitBaja() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/User/DarseDeBaja`,
            {
                partyId: this.Auth.getIDUser()
            },
            {
                headers: { 'Authorization': headerOptions }
            }

        )
    }

    componentWillMount() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/User/GetNombre`,
            {
                partyId: this.Auth.getIDUser()
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        ).then(res => {
            const usuario = res.data;
            this.setState({
                nombre: usuario.nombre,
                primerApellido: usuario.primeR_APELLIDO,
                segundoApellido: usuario.segundO_APELLIDO,

                nombreNuevo: usuario.nombre,
                primerApellidoNuevo: usuario.primeR_APELLIDO,
                segundoApellidoNuevo: usuario.segundO_APELLIDO
            });

        })
    }

    render() {

        return (
            <div>
                <Navigation />
                <div className="container ">

                    <div className="row ">
                        <div className="col mt-4 ">
                            <br /><br />
                            <h2 className="mt-4 ">Información de perfil</h2>
                            <br />

                            <div >
                                <div id="card" className="card">

                                    <div className="form-row">
                                        <div className="col-md-3 mb-3">
                                            <br />
                                            <h6>&nbsp;&nbsp;&nbsp;Nombre completo</h6>
                                        </div>
                                        <div className="col-md-8 mb-3">
                                            <br />
                                            <p>{this.state.nombre} {this.state.primerApellido} {this.state.segundoApellido}</p>
                                        </div>
                                        <div class="col-md-1 mb-3 ">
                                            <button class="btn" id="btnEdit" type="submit" value="sumit" data-toggle="modal" title="Cambiar nombre" href="#myModal"><EditIcon /> </button>
                                        </div>
                                        <div id="myModal" className="modal fade in">
                                            <Modal.Dialog>
                                                <Modal.Header>
                                                    <Modal.Title id="titleModal">
                                                        <h3 id="txtModal">
                                                            Cambiar nombre
                                                        </h3>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="form-group">
                                                        <label for="validationCustom01">Nombre</label>
                                                        <input type="text" className="form-control" name="nombreNuevo" value={this.state.nombreNuevo} onChange={this.handleChange} placeholder="Nombre" />
                                                    </div>
                                                    <div className="form-group">

                                                        <label for="validationCustom02">Primer Apellido</label>
                                                        <input type="text" className="form-control" value={this.state.primerApellidoNuevo} onChange={this.handleChange} name="primerApellidoNuevo" placeholder="Primer Apellido" />
                                                    </div>
                                                    <div >
                                                        <label for="validationCustom02">Segundo Apellido</label>
                                                        <input type="text" className="form-control" value={this.state.segundoApellidoNuevo} onChange={this.handleChange} name="segundoApellidoNuevo" placeholder="Segundo Apellido" />
                                                    </div>
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                                                    <button class="btn btnBlue" type="submit" value="sumit" data-dismiss="modal" onClick={() => this.handleSubmitName()}>Guardar</button>
                                                </Modal.Footer>
                                            </Modal.Dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div >
                                <div id="card" className="card">

                                    <div className="form-row">
                                        <div className="col-md-3 mb-3">
                                            <br />
                                            <h6>&nbsp;&nbsp;&nbsp;Contraseña</h6>
                                        </div>
                                        <div className="col-md-8 mb-3">
                                            <p className="mt-4">•••••••••••••</p>
                                        </div>
                                        <div class="col-md-1 mb-3">
                                            <button class="btn" id="btnEdit" type="submit" value="sumit" data-toggle="modal" href="#myModalContraseña" title="Cambiar contraseña"><EditIcon /> </button>
                                        </div>
                                        <div id="myModalContraseña" className="modal fade in">
                                            <Modal.Dialog>
                                                <Modal.Header>
                                                    <Modal.Title id="titleModal">
                                                        <h3 id="txtModal">
                                                            Cambiar contraseña
                                                        </h3>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="form-group">
                                                        <label for="validationCustom03">Contraseña actual</label>
                                                        <input type="text" class="form-control" id="validationCustom03" onChange={this.handleChange} name="passwordActual" placeholder="Contraseña actual" />
                                                    </div>
                                                    <div className="form-group">

                                                        <label for="validationCustom04">Contraseña nueva</label>
                                                        <input type="text" class="form-control" id="validationCustom04" onChange={this.handleChange} name="password1" placeholder="Mínimo 8 caracteres" />
                                                    </div>
                                                    <div >
                                                        <label for="validationCustom05">Repetir contraseña</label>
                                                        <input type="text" class="form-control" id="validationCustom05" onChange={this.handleChange} name="password2" placeholder="Repetir contraseña" />
                                                    </div>
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                                                    <button class="btn btnBlue" type="submit" value="sumit" onClick={() => this.handleSubmitPass()}>Guardar</button>
                                                </Modal.Footer>
                                            </Modal.Dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-4 md-3 card" id="card">
                                <form onSubmit={this.handleSubmitBaja}>
                                    <div className="form-row">
                                        <div className="col-md-3 mb-3">
                                            <br />
                                            <h6>&nbsp;&nbsp;&nbsp;Darse de baja</h6>
                                        </div>
                                        <div className="col-md-8 mb-3">
                                            <p className="mt-4" id="txtCard">
                                                Si crees que no volverás a utilizar Anderson Security y deseas darte de baja, podemos ocuparnos de ello. Solo, ten en cuenta que no podrás reactivar sin contactarte con un administrador del sistema. Para darte de baja, haz clic en el botón “Darse de baja”.
                                           </p>

                                        </div>
                                        <div class="col-md-1 mb-3 mt-4 ">
                                            <button class="btn" id="btnEdit" type="submit" data-toggle="modal" href="#myModalBaja" title="Darse de baja"><ExitIcon /></button>
                                        </div>
                                        <div id="myModalBaja" className="modal fade in">
                                            <Modal.Dialog>
                                                <Modal.Header>
                                                    <Modal.Title id="titleModal">
                                                        <h3 id="txtModal">
                                                            Darse de baja
                                                        </h3>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>

                                                    <div >
                                                        <label for="validationCustom05">¿Seguro que desea darse de baja?</label>

                                                    </div>
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button id="close" className="btnRed" data-dismiss="modal">No</Button>
                                                    <button class="btn btnBlue" type="submit" value="sumit" onClick={() => this.handleSubmitBaja()}>Sí</button>
                                                </Modal.Footer>
                                            </Modal.Dialog>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AjustesPerfil;