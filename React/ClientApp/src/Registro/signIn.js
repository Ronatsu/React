import React, { Component } from 'react';
import './SiginIn.css';
import { Link } from "react-router-dom";
import Background from '../components/Background';
import axios from 'axios';
import Nav from '../components/NavigationUnregistred';
import $ from 'jquery';
import color from '@material-ui/core/colors/orange';
import { isNull } from 'util';
import { Button, Modal } from 'react-bootstrap'


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
        $(document).ready(function () {
            $('#valor').keyup(function () {
                $(this).each(function () {
                    var campos = $(this).val();
                    if ((campos.toLowerCase == ("select * from").toLowerCase) || (campos.toLowerCase == ("delete * from")).toLowerCase) {
                        $("#msj").html('Uno de los campos contiene una sentencia invalida');
                        $("#modal2").show();
                    } else {
                        $("#modal2").css("display", "none");
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
                <br /><br /><br /><br />
                <div className="container">
                    <h3>Datos Personales</h3>
                    <br></br>
                    <div className="row">
                        <div className="col-md-6 mb-6">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <div className="form-group">
                                        <label for="nombreUsuario">Nombre</label>
                                        <input type="text" className="form-control validar" name="nombre" id="valor" placeholder="Ingrese su nombre" value={this.state.nombre} onChange={this.handleChange}></input>
                                        <br></br>
                                        <label for="apellidoUsuario">Primer apellido</label>
                                        <input type="text" className="form-control" name="apellido" id="valor" placeholder="Primer apellido" value={this.state.apellido} onChange={this.handleChange}></input>
                                        <br></br>
                                        <label for="segundoApellidoUsuario">Segundo apellido</label>
                                        <input type="text" className="form-control" name="segundoApellido" id="valor" placeholder="Segundo apellido" value={this.state.segundoApellido} onChange={this.handleChange}></input>
                                        <br></br>
                                        <label for="InputEmail">Correo electrónico </label>
                                        <input type="email" className="form-control" name="email" id="valor" aria-describedby="emailHelp" placeholder="Ejemplo@impesa.net." value={this.state.email} onChange={this.handleChange}></input>
                                        <br></br>
                                        <label for="contraseñaRegistro">Contraseña</label>
                                        <input type="password" className="form-control" name="contraseña" id="contraseñaRegistro" placeholder="Contraseña" value={this.state.contraseña} onChange={this.handleChange}></input>
                                        <span className={styleAlert()} role="alert" id="passstrength"></span>

                                        <br></br>
                                        <label for="confirnContraseña">Contraseña</label>
                                        <input type="password" className="form-control" name="contraseñaConfirmacion" id="confirnContraseña" placeholder="Confirmación contraseña"></input>
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
                                        <button id="btn1" className="btn btn-primary" type="submit" value="sumit">Registrar</button>
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
                            <Button id="close" bsStyle="primary">Aceptar</Button>
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