import React from 'react';
import './passStyle.css';
import $ from 'jquery';
import axios from 'axios';


class recover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = event => {
        fetch('https://localhost:44372/api/Mail/', {
            method: 'POST',
            body: JSON.stringify(this.state),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
        event.preventDefault();
    };
    render() {
        return (
            <div className="container" id="div_principal">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h2 className="form-signin-heading">Recuperar Contraseña</h2>

                    <div className="form-group">

                        <input id="idMail" type="text" name="email" className="form-control" placeholder="Correo Electronico" value={this.state.email} onChange={this.handleInputChange} autoFocus />
                        <span className="help-block"></span>
                    </div>

                    <div className="form-group">
                        <input type="text" name="emailConfim" className="form-control" placeholder="Confirmar Correo Electronico" />
                        <span className="help-block"></span>
                        <button className="btn  btn-primary disable btn-block " type="submit">Enviar</button>
                    </div>

                </form>
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
