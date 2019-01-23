import React, { Component } from 'react';
import './SiginIn.css';
import axios from 'axios';
import Nav from '../components/NavigationToHome';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap'
import '../components/ButtonColor.css';
import AuthService from '../components/AuthService';


class registroColaborador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            nombre: '',
            apellido: '',
            segundoApellido: '',
            password1: '',
            password2: '',
            optionsRadios: '',
        }
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        $(document).ready(function () {
            $('#btn1').click(function () {
                $('.validar').each(function () {
                    if ($(this).val().trim() === '') {
                        alert("El campo " + $(this).attr('placeholder') + " esta vacio");
                        return false;
                    }
                });
            });
        });

        $(document).ready(function () {
            $("#btn1").click(function () {
                if (validatePassword() == false) {
                    $("#msj").html('La contraseña tiene que ser fuerte para poder completar el registro');
                    $("#modal2").show();

                    $("#close").click(function () {
                        $("#modal2").css("display", "none");
                    });
                }
            });
        });
        /** $(document).ready(function () {
             $("#btn1").click(function () {
 
                 $('#modal2').modal();
                /** $("#div1").css("display", "none");
                 $('#btn_click').hide(100000);
 
             });
 
         });*/
        $(document).ready(function () {
            $('#contraseñaRegistro').keyup(function (e) {
                if ($('#contraseñaRegistro').val().length < 1) {
                    $('#passstrength').fadeOut(1000);
                } else {
                    $('#passstrength').fadeIn(1000);
                    setTimeout(function () {
                        $("#passstrength").fadeOut(1000);
                    }, 5000);
                    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                    var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                    var enoughRegex = new RegExp("(?=.{8,}).*", "g");
                    if (false == enoughRegex.test($(this).val())) {
                        $('#passstrength').html('Más caracteres');
                    } else if (strongRegex.test($(this).val())) {
                        $('#passstrength').html('Fuerte');
                    } else if (mediumRegex.test($(this).val())) {
                        $('#passstrength').html('Media');
                    } else {
                        $('#passstrength').html('Débil');
                    }
                    return true;
                }
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

    handleSubmit = event => {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        event.preventDefault();

        console.log(this.state.apellido);
        console.log(this.state.segundoApellido);
        axios.post(`http://localhost:44372/api/Registro/MethodUserRegister`, {
            email: this.state.email,
            nombre: this.state.nombre,
            primer_apellido: this.state.apellido,
            segundo_apellido: this.state.segundoApellido,
            habilitado: this.state.habilitado,
            password1: this.state.password1,
            password2: this.state.password2,
            optionsRadios: this.state.optionsRadios,
            rol_usuario: this.state.rol_usuario,
            asigna_incidencia: true
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div className="App">
                <Nav />
                <br /><br /><br /><br />
                <div className="container">
                    <h3>Datos Personales</h3>
                    <br></br>
                    <div className="row">
                        <div className="col-md-6 mb-6">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <div className="form-group">
                                        <label >Nombre</label>
                                        <input type="text" className="form-control validar" name="nombre" placeholder="Ingrese su nombre" onChange={this.handleChange}></input>
                                        <br></br>
                                        <label>Primer apellido</label>
                                        <input type="text" className="form-control validar" name="apellido" placeholder="Primer apellido" onChange={this.handleChange}></input>
                                        <br></br>
                                        <label >Segundo apellido</label>
                                        <input type="text" className="form-control" name="segundoApellido" placeholder="Segundo apellido" onChange={this.handleChange}></input>
                                        <br></br>
                                        <label >Correo electrónico </label>
                                        <input type="email" className="form-control validar" name="email" aria-describedby="emailHelp" placeholder="ejemplo@impesa.net" onChange={this.handleChange}></input>
                                        <br></br>
                                        <label >Contraseña</label>
                                        <input type="password" className="form-control validar" name="password1" id="contraseñaRegistro" placeholder="Contraseña" onChange={this.handleChange}></input>
                                        <span className={styleAlert()} role="alert" id="passstrength"></span>

                                        <br></br>
                                        <label>Contraseña</label>
                                        <input type="password" className="form-control validar" name="password2" id="confirnContraseña" onChange={this.handleChange} placeholder="Confirmación contraseña"></input>
                                        <br></br>
                                        <legend>Tipo usuario</legend>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="I" checked onChange={this.handleChange}></input>Interno</label>
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="E" onChange={this.handleChange}></input>Externo</label>
                                        </div>
                                        <br></br>
                                        <button id="btn1" className="btn btnBlue" type="submit" value="sumit">Registrar</button>
                                        <div id="btn_click">{validatePassword()}</div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-2 mb-2"></div>

                        <div className="col-md-4 mb-4">

                            <br /><br /><br /><br />
                            <img src={require("../components/imagenesImpesa/ICONO ANDERSON1.png")} width="255" />
                        </div>
                    </div>
                </div>
                <div className="container" id="modal2">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Contraseña Incorrecta</Modal.Title>
                        </Modal.Header>

                        <Modal.Body id="msj"></Modal.Body>

                        <Modal.Footer>
                            <Button id="close" className="btnBlue">Aceptar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>
        )
    }
}
export default registroColaborador;

function styleAlert() {
    var mensaje = $('#passstrength').text();
    /* var mensaje= document.getElementById("passstrength").innerHTML*/
    if (mensaje == "Débil") {
        return "form-control alert alert-danger";
    } else if (mensaje == "Media") {
        return "alert alert-warning";
    } else if (mensaje == "Fuerte") {
        return "alert alert-success";
    } else {
        return "alert alert-dark";
    }
}

function validatePassword() {
    var mensaje = $('#passstrength').text();
    /* var mensaje= document.getElementById("passstrength").innerHTML*/
    if (mensaje == "Débil") {
        return false;
    } else if (mensaje == "Media") {
        return false;
    } else if (mensaje == "Más caracteres") {
        return false;
    } else if (mensaje == "Fuerte") {
        return true;
    } else if (mensaje.length < 1 || mensaje == null) {
        return false;
    }
    return false;
}