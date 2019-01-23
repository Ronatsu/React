import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthService from './components/AuthService';

import Registro from './Registro/Registro';
import Home from './WebInicio/Home.jsx';
import Form from './RegistroIncidente/Form';
import AsignacionIncidencia from './RegistroIncidente/AsignacionIncidencia';
import Configuracion from './configuracion/Perfil';
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
import SinAsignar from './RegistroIncidente/SinAsignar';
import TipoIncidencia from './Administrator/AdminTipoIncidencia';
import TableUserList from './RegistroIncidente/TableIncidentUser';
import AdminMetodos from './Administrator/AdminMetodoDeteccion';

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
                    <Route path="/ForgotPass" component={ForgotPass} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/InformacionIncidencia" component={InformacionIncidencia} />
                    <Route path="/SignIn" component={SingIn} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/MenuGrafico" component={MenuReportes} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/SelectUserIncident" component={SelectUserIncident} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/SinAsignar" component={SinAsignar} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/TipoIncidencia" component={TipoIncidencia} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/MetodosDeteccion" component={AdminMetodos} />
                    <PrivateRoute authed={this.Auth.loggedIn()} path="/TableUserList/:id?/:completeName?" component={TableUserList} />
                </div>
            </Switch>
            
        )
    }
}

export default App;
