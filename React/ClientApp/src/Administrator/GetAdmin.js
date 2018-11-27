import React, { Component } from 'react';
import Navigation from './Admin_Header';
import Navigatiom from '../WebInicio/Home';

class App extends Component {
  render() {
    return (
      <body>
        <Navigation />
        <div>
          <Navigatiom />
        </div>
      </body>
    );
  }
}

export default App;
/*
 <Navigation />
        <div className="container-fluid" id="div_ancho_completo">
          <Contenedor body={children}/>
        </div>
        <Footer />
*/