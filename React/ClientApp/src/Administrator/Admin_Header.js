import './Admin_Header.css';
import React from 'react';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import ExitIcon from '@material-ui/icons/Input';
import SettingsIcon from '@material-ui/icons/Settings';

class AdminNavigation extends React.Component {
  render() {
    return (
      <nav className="container-fluid navbar navbar-expand-lg navbar-light" id="nav">
        <a className="navbar-brand" href="#"><img src={require("../components/imagenesImpesa/ICONO ANDERSON1.png")} width="35" height="35"></img></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Inicio<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <Link to="/InsertarIncidencia"><a className="nav-link" >Crear Incidencia</a></Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Administar</a>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/BlockUser"><a className="dropdown-item" href="#">Bloquear Usuarios</a></Link>
                <a className="dropdown-item" href="#">Desbloquear Usuarios</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Aceptar Usuarios</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"></a>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0 dropdown">
          
            <button className="btn btn-outline-primary my-2 my-sm-0 dropdown-toggle" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><PersonIcon /> Maria Jose Brenes</button>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/AjustePerfil"> <a className="dropdown-item" href="#"><SettingsIcon /> Perfil</a></Link>
              <div className="dropdown-divider"></div>
              <Link to="/"> <a className="dropdown-item" href="#"><ExitIcon /> Cerrar sesion</a></Link>
            </div>

          </form>

        </div>
      </nav >
    );
  }
}
export default AdminNavigation;