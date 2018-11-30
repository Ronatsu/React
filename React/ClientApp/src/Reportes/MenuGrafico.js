import React from 'react';
import Navigation from '../components/Navigation';
import App from '../Reportes/Grafico';
import App1 from '../Reportes/Grafico1';
import Funnel from '../Reportes/Grafico2';
import MyCsvLink from '../Reportes/MyCsvLink';
import '../components/ButtonColor.css';

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

                        <ul className="nav nav-pills bg-light" role="tablist">
                            <li className="nav-item">
                                <button className="btn btnBlueOutline" data-toggle="pill" href="#home">Casos de incidencia</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btnBlueOutline" data-toggle="pill" href="#menu1">Ataques frecuentes</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btnBlueOutline" data-toggle="pill" href="#menu2">Vulnerabilidad</button>
                            </li>
                        </ul>


                        <div className="tab-content">

                            <div id="home" className="container tab-pane fade"><br></br>
                                <h3>Reporte 1</h3>
                                <App />
                            </div>

                            <div id="menu1" className="container tab-pane fade"><br></br>
                                <h3>Reporte 2</h3>
                                <App1 />
                            </div>

                            <div id="menu2" className="container tab-pane fade"><br></br>
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