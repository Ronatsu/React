import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Componente
import App from '../App';
import Registro from '../Registro/Registro';
import Home from '../WebInicio/Home';
import Form from '../RegistroIncidente/Form';
import AsignacionIncidencia from '../RegistroIncidente/AsignacionIncidencia';
import SinAsignar from '../RegistroIncidente/SinAsignar';
import Configuracion from '../configuracion/Perfil';
import BlockUser from '../Administrator/Block_User';
import sidebar from '../components/SidebarAdmin';
import NewUser from '../Administrator/NewUser';
import InformacionIncidencia from '../RegistroIncidente/InformacionIncidencia';
import MenuReportes from '../Reportes/MenuGrafico';
import AdminArea from '../Administrator/AdminArea';
import AdminTech from '../Administrator/AdminTech';
import AdminMetodos from '../Administrator/AdminMetodoDeteccion';
import AdminIncidencia from '../Administrator/AdminTipoIncidencia';
import ForgotPass from '../WebInicio/Recovery';
import SingIn from '../Registro/signIn';
import SelectUserIncident from '../RegistroIncidente/SelectUserIncidents'
import TableUserList from '../RegistroIncidente/TableIncidentUser';
import VerificarIncidencia from '../RegistroIncidente/VerificarIncidencia';
import MisIncidencias from '../RegistroIncidente/MisIncidencias';



const AppRutas = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Registro} />
            <Route exact path="/incidentes" component={Home} />
            <Route exact path="/InsertarIncidencia" component={Form} />
            <Route exact path="/AjustePerfil" component={Configuracion} />
            <Route exact path="/BlockUser" component={BlockUser} />
            <Route exact path="/AsignacionIncidencia/:id?" component={AsignacionIncidencia} />
            <Route exact path="/AdminArea" component={AdminArea} />
            <Route exact path="/AdminTech" component={AdminTech} />
            <Route exact path="/sidebar" component={sidebar} />
            <Route exact path="/newUser" component={NewUser} />
            <Route exact path="/ForgotPass" component={ForgotPass} />
            <Route exact path="/InformacionIncidencia/:id?/:estadoId?" component={InformacionIncidencia} />
            <Route exact path="/SignIn" component={SingIn} />
            <Route exact path="/MenuGrafico" component={MenuReportes} />
            <Route exact path="/SelectUserIncident" component={SelectUserIncident} />
            <Route exact path="/TableUserList/:id?/:completeName?" component={TableUserList} />
            <Route exact path="/SinAsignar" component={SinAsignar} />
            <Route exact path="/TipoIncidencia" component={AdminIncidencia} />
            <Route exact path="/MetodosDeteccion" component={AdminMetodos} />
            <Route exact path="/VerificarIncidencia/:id?" component={VerificarIncidencia} />
            <Route exact path="/MisIncidencias" component={MisIncidencias} />

        </Switch>

    </App>;

export default AppRutas;
