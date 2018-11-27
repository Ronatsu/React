import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Contenedor from './Contenerdor';
import Footer from './components/Footer';
import $ from 'jquery';


class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

 /* constructor(props) {
    super();
    this.state = {
    }

    super(props);

    $(document).ready(function () {
      if($("body").height() < $(window).height()){
       $("footer").css({"position":"absolute","bottom":"0px"});
            }
    });
}*/
  render() {
    const { children } = this.props;
    return (
      <body>
          
        <div className="container-fluid" id="div_ancho_completo">
          <Contenedor body={children}/>
        </div>
       <footer className="page-footer" id="footer">
        <Footer />
        </footer>
      </body>
    );
  }
}

export default App;
