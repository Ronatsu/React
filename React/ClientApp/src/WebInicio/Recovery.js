import React from 'react';
import './passStyle.css';
import $ from 'jquery';
import axios from 'axios';
import '../components/ButtonColor.css';
import Nav from '../components/NavigationToHome';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'


class recover extends React.Component {
    constructor(props) {
        super(props);

        $(document).ready(function () {
            $("#id_send").click(function () {
                $(this).each(function () {
                    $("#modal2").show();
                    $("#close").click(function () {
                        $("#modal2").css("display", "none");
                    });
                });
            });
        });

        $(document).ready(function () {
            $('#id_send2').click(function () {
                $('input').each(function () {
                    if ($(this).val().trim() === '') {
                        alert("El campo " + $(this).attr('placeholder') + " esta vacio");
                        return false;
                    }
                });
            });
        });
    }

    state = {
        email: ''
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
        event.preventDefault();
        axios.post(`http://localhost:44372/api/RecuperarContraseña`, {
            email1: this.state.email1,
            email2: this.state.email2,

        });
        console.log(this.state.email2 + " 2");
        console.log(this.state.email1 + " 1");
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container" id="div_principal">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <h2 className="form-signin-heading">Recuperar Contraseña</h2>

                        <div className="form-group">

                            <input id="idMail" type="mail" name="email1" className="form-control" placeholder="Correo electrónico " value={this.state.email1} onChange={this.handleChange} autoFocus />
                            <span className="help-block"></span>
                        </div>

                        <div className="form-group">
                            <input type="mail" name="email2" className="form-control" value={this.state.email2} onChange={this.handleChange} placeholder="Confirmar correo electrónico " />
                            <span className="help-block"></span>
                            <button className="btn btnBlue btn-block" type="submit" id="id_send2">Enviar</button>
                        </div>

                    </form>

                </div>
                <div className="container" id="modal2">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title id="titleModal"></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h2>¡Éxito!</h2>
                            <p>Una nueva contraseña se ha enviado a su correo electrónico.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Link to="/">  <Button id="close" className="btnBlue">Aceptar</Button></Link>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>
        )
    }
}
export default recover;