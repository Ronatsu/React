import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthService from './components/AuthService';

import Registro from './Registro/Registro';
import Home from './WebInicio/Home';
import Form from './RegistroIncidente/Form';
import AsignacionIncidencia from './RegistroIncidente/AsignacionIncidencia';
import Configuracion from './configuracion/Perfil';
//import GetAdmin from './Administrator/GetAdmin';
import BlockUser from './Administrator/Block_User';
import sidebar from './components/SidebarAdmin';
import NewUser from './Administrator/NewUser';
import InformacionIncidencia from './RegistroIncidente/InformacionIncidencia';
import MenuReportes from './Reportes/MenuGrafico';
import AdminArea from './Administrator/AdminArea';
import AdminTech from './Administrator/AdminTech';
import ForgotPass from './WebInicio/Recovery';
import SingIn from './Registro/signIn';
import SelectUserIncident from './RegistroIncidente/SelectUserIncidents';
import PrivateRoute from './PrivateRoute';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.Auth = new AuthService();
    }

    render() {
        console.log(this.Auth.loggedIn());
        return (
            
            <Switch>
                <div>
                    <Route exact path="/" component={Registro} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/incidentes" component={Home} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/InsertarIncidencia" component={Form} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/AjustePerfil" component={Configuracion} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/BlockUser" component={BlockUser} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/AsignacionIncidencia" component={AsignacionIncidencia} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/AdminArea" component={AdminArea} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/AdminTech" component={AdminTech} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/sidebar" component={sidebar} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/newUser" component={NewUser} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/ForgotPass" component={ForgotPass} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/InformacionIncidencia" component={InformacionIncidencia} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/SignIn" component={SingIn} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/MenuGrafico" component={MenuReportes} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/SelectUserIncident" component={SelectUserIncident} />
                </div>
            </Switch>
        )
    }
}

export default App;
