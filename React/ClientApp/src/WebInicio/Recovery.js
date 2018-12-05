import React from 'react';
import './passStyle.css';
import $ from 'jquery';
import axios from 'axios';
import '../components/ButtonColor.css';
import Nav from '../components/NavigationUnregistred';
import { Button, Modal, FormControl } from 'react-bootstrap'


class recover extends React.Component {


    state = {
        email: ''
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

            console.log(this.state.email2 + " 2");
            console.log(this.state.email1 + " 1");
        
        axios.post(`http://localhost:58055/api/RecuperarContraseña`, {
            email1: this.state.email1,
            email2: this.state.email2,
          
        })
            
    }
    render() {
        return (
            <div>
                <Nav />
                <div className="container" id="div_principal">
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Recuperar Contraseña</h2>

                        <div className="form-group">

                            <input id="idMail" type="mail" name="email1" className="form-control" placeholder="Correo electrónico " value={this.state.email1} onChange={this.handleChange} autoFocus />
                            <span className="help-block"></span>
                        </div>

                        <div className="form-group">
                            <input type="mail" name="email2" className="form-control" value={this.state.email2} onChange={this.handleChange} placeholder="Confirmar correo electrónico " />
                            <span className="help-block"></span>
                            <button className="btn btnBlue form-control" type="submit" >Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default recover;