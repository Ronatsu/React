import React from 'react';
import Navigation from '../components/Navigation';
import App from '../Reportes/Grafico';
import App1 from '../Reportes/Grafico1';
import App11 from '../Reportes/Grafico3';
import Funnel from '../Reportes/Grafico2';
import App2 from '../Reportes/Grafico4';
import App3 from '../Reportes/Grafico5';
import App4 from '../Reportes/Grafico6';
import App5 from '../Reportes/Grafico7';
import App6 from '../Reportes/Grafico8';
import App7 from '../Reportes/Grafico9';
import App8 from '../Reportes/Grafico10';
import App9 from '../Reportes/Grafico11';
import App10 from '../Reportes/Grafico12';
import App12 from '../Reportes/Grafico13';
import App13 from '../Reportes/Grafico14';
import App14 from '../Reportes/Grafico15';
import App15 from '../Reportes/Grafico16';
import App16 from '../Reportes/Grafico17';
import MyCsvLink from '../Reportes/MyCsvLink';
import '../components/ButtonColor.css';
import AuthService from '../components/AuthService';
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';

class MenuReportes extends React.Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
    }

    render() {

        if (this.Auth.isAdmin()) {
            return (
                <div className="container-fluid">
                    <Navigation />
                    <form className="container" >

                        <fieldset className="fields">
                            <header className="App-header">
                                <br /><br /><br />
                                <h3 className="mt-4">Menú de reportes</h3>
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
        } else {
            return (
                <div>
                    <div className="container" id="midle">
                        <div className="row">
                            <div className=" col-md-2 mb-3">
                            </div>
                            <div className="form-inline col-md-10 mb-3" >
                                <div >
                                    <h1 id="title"><strong >UPSSS...</strong></h1>
                                    <h3 >Lo sentimos, no cuentas con los permisos necesarios para ingresar en esta área.</h3>
                                </div>
                                <div>
                                    <ChartIcon id="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="page-footer" id="footererror">
                        <Footer />
                    </footer>
                </div>
            )
        }


        
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
                                <button className="btn btnBlueOutline" data-toggle="pill" href="#anuales">Anuales</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btnBlueOutline" data-toggle="pill" href="#mensuales">Mensuales</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btnBlueOutline" data-toggle="pill" href="#trimestrales">Trimestrales</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btnBlueOutline" data-toggle="pill" href="#semanales">Semanales</button>
                            </li>


                        </ul>


                        <div className="tab-content">

                            <div id="anuales" className="container tab-pane fade"><br></br>

                                <ul className="nav nav-pills bg-light" role="tablist">


                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu3">Costo recuperación</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu4">Horas incidentes</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu6">Tiempo de continencia</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#reporteX">Total ataques</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#reporteY">Ataques detectados internos</button>
                                    </li>


                                </ul>
                            </div>


                            <div id="mensuales" className="container tab-pane fade"><br></br>
                                <ul className="nav nav-pills bg-light" role="tablist">

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu5">Costo recuperación</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu7">Horas incidentes</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu">Tiempo de continencia</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu1">Total ataques</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu2">Ataques detectados internos</button>
                                    </li>

                                </ul>
                            </div>


                            <div id="semanales" className="container tab-pane fade"><br></br>

                                <ul className="nav nav-pills bg-light" role="tablist">


                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu8">Horas incidentes</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu9">Tiempo de continencia</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu10">Total ataques</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu11">Ataques detectados internos</button>
                                    </li>


                                </ul>
                            </div>

                            <div id="trimestrales" className="container tab-pane fade"><br></br>

                                <ul className="nav nav-pills bg-light" role="tablist">


                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu12">Horas incidentes</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu13">Tiempo de continencia</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu14">Total ataques</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="btn btnBlueOutline" data-toggle="pill" href="#menu15">Ataques detectados internos</button>
                                    </li>


                                </ul>
                            </div>

                        </div>

                        <div className="tab-content">

                            <div id="menu" className="container tab-pane fade"><br></br>
                                <App />
                            </div>

                            <div id="menu1" className="container tab-pane fade"><br></br>
                                <App1 />
                            </div>

                            <div id="menu2" className="container tab-pane fade"><br></br>
                                <Funnel />
                            </div>

                            <div id="menu3" className="container tab-pane fade"><br></br>
                                <App11 />
                            </div>

                            <div id="menu4" className="container tab-pane fade"><br></br>
                                <App2 />
                            </div>

                            <div id="reporteY" className="container tab-pane fade"><br></br>
                                <App3 />
                            </div>

                            <div id="menu6" className="container tab-pane fade"><br></br>
                                <App4 />
                            </div>

                            <div id="reporteX" className="container tab-pane fade"><br></br>
                                <App5 />
                            </div>

                            <div id="menu5" className="container tab-pane fade"><br></br>
                                <App6 />
                            </div>

                            <div id="menu7" className="container tab-pane fade"><br></br>
                                <App7 />
                            </div>

                            <div id="menu8" className="container tab-pane fade"><br></br>
                                <App12 />
                            </div>

                            <div id="menu9" className="container tab-pane fade"><br></br>
                                <App9 />
                            </div>

                            <div id="menu10" className="container tab-pane fade"><br></br>
                                <App10 />
                            </div>

                            <div id="menu11" className="container tab-pane fade"><br></br>
                                <App8 />
                            </div>

                            <div id="menu12" className="container tab-pane fade"><br></br>
                                <App16 />
                            </div>

                            <div id="menu13" className="container tab-pane fade"><br></br>
                                <App13 />
                            </div>

                            <div id="menu14" className="container tab-pane fade"><br></br>
                                <App15 />
                            </div>

                            <div id="menu15" className="container tab-pane fade"><br></br>
                                <App14 />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>


    );
}


export default MenuReportes;