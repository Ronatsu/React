import React from 'react';
import Navigation from '../components/Navigation';
import Modal from 'react-responsive-modal';

class InformacionIncidencia extends React.Component {
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
                            <h3 className="mt-4">Información Incidencia</h3>
                        </header>
                        <div>
                            <br></br>

                        </div>
                    </fieldset>
                </form>
                <BodyInformation />
            </div>
        )
    }
}


class BodyInformation extends React.Component {

    render() {


        return (


            <div className="container">

                <div className="row">

                    <div className="col-xs-4 col-md-4">

                        <div className="Container-div">

                            <div className="form-group blue-border-focus">
                                <label>Dueño Asignación</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                                <br></br>
                                <br></br>
                                <label>Impacto incidencia</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                                <br></br>
                                <br></br>
                                <label>Tecnología incidencia</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                            </div>

                        </div>

                    </div>

                    <div className="col-xs-4 col-md-4">

                        <div className="Container-div">

                            <div className="form-group blue-border-focus">
                                <label>Tipo incidencia</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                                <br></br>
                                <br></br>
                                <label>Fecha incidencia</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                            </div>

                        </div>

                    </div>


                    <div className="col-xs-4 col-md-4">

                        <div className="Container-div">

                            <div className="form-group blue-border-focus">
                                <label>Estado Actual</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                                <br></br>
                                <br></br>
                                <label>Área incidencia</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                                <br></br>
                                <br></br>
                                <label>Grado incidencia</label>
                                <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                                <br></br>
                                <br></br>
                                <div class="pagination justify-content-end">
                                    <div id="myModal" class="modal fade in">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <a class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
                                                    <h4 class="modal-title">Inserte los pasos realizados</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <textarea class="form-control" rows="5" id="comment"></textarea>
                                                </div>
                                                <div class="modal-footer">
                                                    <div class="btn-group">
                                                        <button class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                                                        <button class="btn btn-primary"><span class="glyphicon glyphicon-check"></span> Save</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <a data-toggle="modal" href="#myModal" class="btn btn-primary">Insertar Pasos</a>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        )
    }
}



export default InformacionIncidencia;

