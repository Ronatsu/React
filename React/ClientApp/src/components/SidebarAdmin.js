
import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import './sidebarAdmin.css';

import Navigation from './Navigation';

class Sidebar extends Component {

    render() {
        return (
            <nav className="container-fluid  navbar-expand-lg navbar-light" id="nav">

    
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/Incidentes">    <a className="nav-link" href="#">Inicio<span className="sr-only">(current)</span></a></Link>
                </li>
                <li className="nav-item">
                  <Link to="/InsertarIncidencia"><a className="nav-link" >Crear Incidencia<span className="sr-only">(current)</span></a></Link>
                </li>
    
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Administrar</a>
    
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Usuarios</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Tecnologías</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Areas</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"></a>
                </li>
              </ul>
    
    
    
            </div>
          </nav >

        );
    }
}
export default Sidebar;