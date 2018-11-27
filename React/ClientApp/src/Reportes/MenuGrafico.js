import React from 'react';
import Navigation from '../components/Navigation';
import App from '../Reportes/Grafico';
import App1 from '../Reportes/Grafico1';
import Funnel from '../Reportes/Grafico2';
import MyCsvLink from '../Reportes/MyCsvLink';

class MenuReportes extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="container-fluid">
        <Navigation />
        <form className="container" >

          <fieldset className="fields">
            <header className="App-header">
              <br /><br /><br />
              <h3 className="mt-4">Menu de Reportes</h3>
            </header>
            <div>
              {SelectGraph()}
              <MyCsvLink />
              <div class="pagination justify-content-end">

              </div>
            </div>
          </fieldset>
        </form>

      </div>
    )
  }
}



function SelectGraph() {
  return (

    <div className="container">

      <div className="row">

        <div className="col-xs-12 col-md-12">

          <div className="Container-div">

            <ul class="nav nav-pills bg-light" role="tablist">
              <li class="nav-item">
                <a class="nav-link " data-toggle="pill" href="#home">Casos de incidencia</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#menu1">Ataques frecuentes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#menu2">Vulnerabilidad</a>
              </li>
            </ul>


            <div class="tab-content">

              <div id="home" class="container tab-pane fade"><br></br>
                <h3>Reporte 1</h3>
                <App />
              </div>

              <div id="menu1" class="container tab-pane fade"><br></br>
                <h3>Reporte 2</h3>
                <App1 />
              </div>

              <div id="menu2" class="container tab-pane fade"><br></br>
                <h3>Reporte 3</h3>
                <Funnel />
              </div>


            </div>

          </div>

        </div>

      </div>

    </div>


  );
}


export default MenuReportes;