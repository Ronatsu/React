import React from 'react';
import './passStyle.css';
import $ from 'jquery';
import axios from 'axios';
import '../components/ButtonColor.css';
import Nav from '../components/NavigationUnregistred';


class recover extends React.Component {

    state = {
        email: '',
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://localhost:52224/api/usuario`, {
            email: this.state.email

            
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    render() {
        return (
            <div>
                <Nav />
                <div className="container" id="div_principal">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <h2 className="form-signin-heading">Recuperar Contraseña</h2>

                        <div className="form-group">

                            <input id="idMail" type="text" name="name" className="form-control" placeholder="Correo electrónico " onChange={this.handleChange} autoFocus />
                            <span className="help-block"></span>
                        </div>

                        <div className="form-group">
                            <input type="text" name="emailConfim" className="form-control" placeholder="Confirmar correo electrónico " />
                            <span className="help-block"></span>
                            <button className="btn btnBlue form-control">Enviar</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
export default recover;

/* state = {
        email: ''
    }
    handleInputChange = event => {
        this.setState({ email: event.target.value });
    }
    handleSubmit = event => {

        event.preventDefault();

        const value = {
            email: this.state.email
        };
        axios.post('url', { email: this.state.email })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }*/
