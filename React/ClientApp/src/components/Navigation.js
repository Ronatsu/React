import './estilo.css';
import React from 'react';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import ExitIcon from '@material-ui/icons/Input';
import SettingsIcon from '@material-ui/icons/Settings';
import BuildIcon from '@material-ui/icons/Build';
import PeopleIcon from '@material-ui/icons/People';
import AddUserIcon from '@material-ui/icons/GroupAdd';
import SettingIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChartIcon from '@material-ui/icons/Assessment';
import NewIncidentIcon from '@material-ui/icons/AddCircleOutline';
import '../components/ButtonColor.css';
import AuthService from './AuthService';


class navigatiom extends React.Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
    }


    handleLogout = event => {
        if (this.Auth.loggedIn) {
            this.Auth.logout();
        }

    }




    render() {

        let usuarioLogin = this.Auth.getEmailUser();

        let AreaAdministrativa;
        let AdministracionReporte;
        let AdministracionIncidencia;

        if (this.Auth.isAdmin()) {
            AreaAdministrativa =
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><SettingIcon /> Administrar</a>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to="/newUser">  <a className="dropdown-item" href="#"><AddUserIcon /> Nuevas Solicitudes</a></Link>
                        <Link to="/BlockUser">  <a className="dropdown-item" href="#"><PeopleIcon />Usuarios</a></Link>

                        <div className="dropdown-divider"></div>

                        <Link to="/AdminTech">   <a className="dropdown-item" href="#"><BuildIcon /> Tecnologías</a></Link>
                        <Link to="/AdminArea">   <a className="dropdown-item" href="#"><BuildIcon /> Áreas</a></Link>
                        <Link to="/TipoIncidencia">   <a className="dropdown-item" href="#"><BuildIcon /> Tipos de incidencia</a></Link>

                        <div className="dropdown-divider"></div>

                        <Link to="/SelectUserIncident">   <a className="dropdown-item" href="#"><AssignmentIcon /> Incidencias por usuario</a></Link>
                    </div>
                </li>

            if (this.Auth.isAdmin()) {
                AdministracionIncidencia =
                    <li className="nav-item">
                        <Link to="/SinAsignar"><a className="nav-link" ><AssignmentIcon /> Asignar Incidencia<span className="sr-only">(current)</span></a></Link>
                    </li>

                if (this.Auth.isAdmin()) {
                    AdministracionReporte =
                        <li className="nav-item">
                            <Link to="/MenuGrafico"><a className="nav-link" ><ChartIcon />Reportes<span className="sr-only">(current)</span></a></Link>
                        </li>
                } else {
                    AdministracionReporte =
                        <li className="nav-item dropdown">
                        </li>
                }
            } else {
                AdministracionIncidencia =
                    <li className="nav-item dropdown">
                    </li>
            }
        } else {
            AreaAdministrativa =
                <li className="nav-item dropdown">
                </li>
        }
 
        return (
            <nav className="container-fluid navbar navbar-expand-lg navbar-light" id="nav">
                g
                <Link to="/Incidentes"><img src={require("./imagenesImpesa/ICONO ANDERSON1.png")} width="35" height="35"></img></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/Incidentes">    <a className="nav-link" href="#"><HomeIcon /> Inicio<span className="sr-only">(current)</span></a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/InsertarIncidencia"><a className="nav-link" ><NewIncidentIcon /> Crear Incidencia<span className="sr-only">(current)</span></a></Link>
                        </li>
                        {AdministracionIncidencia}
                        {AdministracionReporte}
                        {AreaAdministrativa}
                        <li className="nav-item">
                            <a className="nav-link" href="#"></a>
                        </li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0 dropdown">



                        <button className="btn btnBlueOutline my-2 my-sm-0 dropdown-toggle" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><PersonIcon /> {usuarioLogin}</button>

                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to="/AjustePerfil"> <a className="dropdown-item" href="#"><SettingsIcon /> Perfil</a></Link>
                            <div className="dropdown-divider"></div>
                            <Link to="/"> <a className="dropdown-item" onClick={this.handleLogout} href="#"><ExitIcon /> Cerrar sesión</a></Link>
                        </div>

                    </form>

                </div>
            </nav >
        );
    }
}
export default navigatiom;