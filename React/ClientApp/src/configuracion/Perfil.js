import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';
import '../components/ButtonColor.css';
import axios from 'axios';


class AjustesPerfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            partyId: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            password1: '',
            password2: '',
            passwordActual: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmitName = event => {
        event.preventDefault();
        axios.post(`http://localhost:58055/api/User/CambiarNombre`, {
            partyId: 3,
            nombre: this.state.nombre,
            primer_apellido: this.state.primerApellido,
            segundo_apellido: this.state.segundoApellido,

        })
            .then(res => {
                console.log(this.state.primerApellido);
                console.log(this.state.segundoApellido);
            })
    }

    handleSubmitPass = event => {
        event.preventDefault();
        axios.post(`http://localhost:58055/api/User/CambiarContraseña`, {
            partyId: 3,
            password1: this.state.password1,
            password2: this.state.password2,
            passwordActual: this.state.passwordActual

        })
    }
    handleSubmitBaja = event => {
        event.preventDefault();
        axios.post(`http://localhost:58055/api/User/DarseDeBaja`, {
            partyId: 3
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
                            <div>
                                <h3 className="mt-4 ">Cambiar nombre</h3>
                                <form onSubmit={this.handleSubmitName}>
                                    <div className="form-row" >
                                        <div className="col-md-4 mb-3">
                                            <label for="validationCustom01">Nombre</label>
                                            <input type="text" className="form-control" name="nombre" value={this.state.nombre} onChange={this.handleChange} placeholder="Nombre" />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label for="validationCustom02">Primer Apellido</label>
                                            <input type="text" className="form-control" value={this.state.primerApellido} onChange={this.handleChange} name="primerApellido" placeholder="Primer Apellido" />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label for="validationCustom02">Segundo Apellido</label>
                                            <input type="text" className="form-control" value={this.state.segundoApellido} onChange={this.handleChange} name="segundoApellido" placeholder="Segundo Apellido" />
                                            <div class="pagination justify-content-end">
                                                <button class="btn btnRed  " type="submit" >Cancelar</button>
                                                <button class="btn btnBlue" type="submit" value="sumit">Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="border-top mt-4 md-3">
                                <h3 className=" mt-4">Cambiar contraseña</h3>
                                <form onSubmit={this.handleSubmitPass}>
                                    <div className="form-row">
                                        <div className="col-md-4 mb-4">
                                            <label for="validationCustom03">Contraseña actual</label>
                                            <input type="text" class="form-control" id="validationCustom03" onChange={this.handleChange} name="passwordActual" placeholder="Contraseña actual" />
                                        </div>

                                        <div className="col-md-4 mb-4">
                                            <label for="validationCustom04">Contraseña nueva</label>
                                            <input type="text" class="form-control" id="validationCustom04" onChange={this.handleChange} name="password1" placeholder="Mínimo 8 caracteres" />
                                        </div>
                                        <div class="col-md-4 mb-4">
                                            <label for="validationCustom05">Repetir contraseña</label>
                                            <input type="text" class="form-control" id="validationCustom05" onChange={this.handleChange} name="password2" placeholder="Repetir contraseña" />
                                            <div class="pagination justify-content-end">
                                                <button class="btn btnRed  " type="submit">Cancelar</button>
                                                <button class="btn btnBlue" type="submit">Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="border-top mt-4 md-3">
                                <h3 className=" mt-4">Darse de baja</h3>
                                <form onSubmit={this.handleSubmitBaja}>
                                    <div className="form-row">
                                        <div id="card" className=" card col-md-12 mb-4">
                                            <p className="card-text">
                                                Si crees que no volverás a utilizar Anderson Security y deseas darte de baja, podemos ocuparnos de ello. Solo, ten en cuenta que no podrás reactivar sin contactarte con un administrador del sistema. Para darte de baja, haz clic en el botón “Darse de baja”.
                                           </p>
                                            <div class="pagination justify-content-end">
                                                <button class="btn btnRed  " type="submit">Darse de baja</button>
                                            </div>
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