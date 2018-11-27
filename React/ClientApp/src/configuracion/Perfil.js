import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';

class AjustesPerfil extends Component {

    render() {
        return (
            <div>
                <Navigation />
                <div className="container ">

                    <div className="row ">
                        <div className="col mt-4 ">
                            <br /><br />
                            <div>
                                <h3 className="mt-4 ">Cambiar nombre</h3>
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label for="validationCustom01">Nombre</label>
                                        <input type="text" className="form-control" id="validationCustom01" placeholder="Nombre" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label for="validationCustom02">Primer Apellido</label>
                                        <input type="text" className="form-control" id="validationCustom02" placeholder="Primer Apellido" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label for="validationCustom02">Segundo Apellido</label>
                                        <input type="text" className="form-control" id="validationCustom02" placeholder="Segundo Apellido" />
                                        <div class="pagination justify-content-end">
                                            <button class="btn btn-light  " type="submit">Cancelar</button>
                                            <button class="btn btn-primary" type="submit">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-top mt-4 md-3">
                                <h3 className=" mt-4">Cambiar contraseña</h3>
                                <div className="form-row">
                                    <div className="col-md-4 mb-4">
                                        <label for="validationCustom03">Contraseña actual</label>
                                        <input type="text" class="form-control" id="validationCustom03" placeholder="Contraseña actual" />
                                    </div>

                                    <div className="col-md-4 mb-4">
                                        <label for="validationCustom04">Contraseña nueva</label>
                                        <input type="text" class="form-control" id="validationCustom04" placeholder="Mínimo 8 caracteres" />
                                    </div>
                                    <div class="col-md-4 mb-4">
                                        <label for="validationCustom05">Repetir contraseña</label>
                                        <input type="text" class="form-control" id="validationCustom05" placeholder="Repetir contraseña" />
                                        <div class="pagination justify-content-end">
                                            <button class="btn btn-light  " type="submit">Cancelar</button>
                                            <button class="btn btn-primary" type="submit">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AjustesPerfil;