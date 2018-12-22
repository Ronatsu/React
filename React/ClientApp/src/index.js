import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Approutes from './Rutas/AppRutas';
import * as serviceWorker from './serviceWorker';
import BoundaryError from './ErrorBoundary';

//Componentes

import App from './App';
import Registro from './Registro/Registro';
import Home from './WebInicio/Home';
import Form from './RegistroIncidente/Form';
import AsignacionIncidencia from './RegistroIncidente/AsignacionIncidencia';
import Configuracion from './configuracion/Perfil';
import GetAdmin from './Administrator/GetAdmin';
import BlockUser from './Administrator/Block_User';
import sidebar from './components/SidebarAdmin';
import NewUser from './Administrator/NewUser';
import InformacionIncidencia from './RegistroIncidente/InformacionIncidencia';
import MenuReportes from './Reportes/MenuGrafico';
import AdminArea from './Administrator/AdminArea';
import AdminTech from './Administrator/AdminTech';
import ForgotPass from './WebInicio/Recovery';
import SingIn from './Registro/signIn';
import SelectUserIncident from './RegistroIncidente/SelectUserIncidents'

render(

    <BoundaryError>}>

    <Router>
        <div>
                <Route exact path="/" component={Registro} />
                <Route exact path="/incidentes" component={Home} />
                <Route exact path="/InsertarIncidencia" component={Form} />
                <Route exact path="/AjustePerfil" component={Configuracion} />
                <Route exact path="/getAdmin" component={GetAdmin} />
                <Route exact path="/BlockUser" component={BlockUser} />
                <Route exact path="/AsignacionIncidencia" component={AsignacionIncidencia} />
                <Route exact path="/AdminArea" component={AdminArea} />
                <Route exact path="/AdminTech" component={AdminTech} />
                <Route exact path="/sidebar" component={sidebar} />
                <Route exact path="/newUser" component={NewUser} />
                <Route exact path="/ForgotPass" component={ForgotPass} />
                <Route exact path="/InformacionIncidencia" component={InformacionIncidencia} />
                <Route exact path="/SignIn" component={SingIn} />
                <Route exact path="/MenuGrafico" component={MenuReportes} />
                <Route exact path="/SelectUserIncident" component={SelectUserIncident} />
        </div>
        </Router>
    </BoundaryError>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();