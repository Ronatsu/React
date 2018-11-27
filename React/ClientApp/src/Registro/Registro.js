import React, { Component } from 'react';
import './Registro.css';
import { Link } from "react-router-dom";
import Background from '../components/Background';
import axios from 'axios';
import Nav from '../components/NavigationUnregistred';

class registroColaborador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            nombre: '',
            apellido: '',
            segundoApellido: '',
            habilitado: true,
            contraseña: '',
            optionsRadios: '',
            rol_usuario: 'Administrador'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const colaborador = {
            email: this.state.email,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            segundoApellido: this.state.segundoApellido,
            habilitado: this.state.habilitado,
            contraseña: this.state.contraseña,
            optionsRadios: this.state.optionsRadios,
            rol_usuario: this.state.rol_usuario

        };

        axios.post(`https://localhost:44384/api/Registro`, { colaborador })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (

            <div className="App">

                <Nav />
                <br /><br />
                <Background />
                <div className="container">

                    <div className="row">
                        <br /><br />


                        <div className="col-xs-4 col-sm-4 col-lg-4">

                        </div>
                        <div className="col-xs-4 col-sm-4 col-lg-4">
                            <form>
                                <br/>
                                <div className="form-group">
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                    <h3>Gestión de incidentes de seguridad</h3>
                                </div>
                                <div className="form-group">
                                    <label for="emailLogin">Correo electrónico</label>
                                    <input type="email" className="form-control" id="emailLogin" aria-describedby="correoLogin" placeholder="Enter email"></input>
                                </div>
                                <div className="form-group">
                                    <label for="contraseñaLogin">Contraseña</label>
                                    <input className="form-control" type="password" name="passwordlogin" id="passwordLogin" placeholder="Contraseña"></input><br></br>

                                    <Link to="/ForgotPass"><small id="forgotPassword" className="form-text">¿Olvidaste la contraseña?</small></Link>

                                </div>
                                <Link to="/incidentes"><button className="btn btn-primary">Ingresar</button></Link>
                            </form>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-lg-4">


                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default registroColaborador;