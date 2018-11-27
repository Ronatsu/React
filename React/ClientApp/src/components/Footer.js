import React from 'react';
import './footer.css';
class footer extends React.Component {
    render() {
        return (
            
            <div className="footer-copyright text-center py-2" id="footer-main">
            <img className="mr-sm-1" src={require("./imagenesImpesa/IMPESA LOGO2.png")} width="80" height="20"></img>
            <a className="my-2 my-sm-0">© 2018 IMPESA® Todos los derechos reservados. Anderson® es una marca registrada de IMPESA.</a>
            <img className="ml-2" src={require("./imagenesImpesa/ICONO ANDERSON1.png")} width="40" height="40"></img>
            </div>
       
        )
    }
}
export default footer;