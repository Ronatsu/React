import './estilo.css';
import React from 'react';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/PersonAdd';



class navigatiom extends React.Component {
  render() {
    return (
      <nav className="container-fluid navbar navbar-expand-lg navbar-light" id="nav">
        <Link to="/"><img src={require("./imagenesImpesa/ICONO ANDERSON1.png")} height="30"/>
        <img src={require("./imagenesImpesa/anderson.png")} height="35"/></Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"/>

          <form className="form-inline my-2 my-lg-0 dropdown">
           <Link to="/SignIn"><button className="btn btn-outline-primary my-2 my-sm-0 " role="button"><PersonIcon />Crear cuenta</button></Link> 
          </form>

        </div>
      </nav >
    );
  }
}
export default navigatiom;