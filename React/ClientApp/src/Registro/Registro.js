import React, { Component } from 'react';
import './Registro.css';
import { Link } from "react-router-dom";
import Background from '../components/Background';
import axios from 'axios';
import Nav from '../components/NavigationUnregistred';
import '../components/ButtonColor.css';
import AuthService from '../components/AuthService';

class registroColaborador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailLogin: '',
            nombre: '',
            apellido: '',
            segundoApellido: '',
            habilitado: true,
            passwordlogin: '',
            optionsRadios: '',
            rol_usuario: 'Administrador'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        alert("Email: " + this.state.emailLogin);
        alert("Password: " + this.state.passwordlogin);
        this.Auth.login(this.state.emailLogin, this.state.passwordlogin)
            .then(res => {
                this.props.history.replace('/incidentes');
            }).catch(err => {
                alert(err);
            })
    }

    handleSubmit = event => {
        event.preventDefault();

        this.Auth.login(this.state.email, this.state.contraseña)
    }
    //{null.map(val => val)}
    render() {
        return (

            <div className="App">
               
                <Nav />
                
                <Background />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4 col-sm-4 col-lg-4">

                        </div>
                        <div className="col-xs-4 col-sm-4 col-lg-4">
                            <form>
                                <br/>
                                <div className="form-group">
                                <br></br>
                                <br></br>
                                <br></br>
                        
                                
                                    <h3>Gestión de incidentes de seguridad</h3>
                                </div>
                                <div className="form-group">
                                    <label for="emailLogin">Correo electrónico</label>
                                    <input type="email" className="form-control" id="emailLogin" name="emailLogin" aria-describedby="correoLogin" placeholder="Ingrese el correo" value={this.state.emailLogin} onChange={this.handleChange}></input>
                                </div>
                                <div className="form-group">
                                    <label for="contraseñaLogin">Contraseña</label>
                                    <input className="form-control" type="password" name="passwordlogin" id="passwordLogin" placeholder="Contraseña" value={this.state.passwordlogin} onChange={this.handleChange}></input><br></br>

                                    <Link to="/ForgotPass"><small id="forgotPassword" className="form-text">¿Olvidaste la contraseña?</small></Link>

                                </div>
                                <button className="btn btnBlue" onClick={this.handleFormSubmit}>Ingresar</button>

                                
                                <Link to="/incidentes"><button className="btn btnBlue">Ingresar</button></Link>
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