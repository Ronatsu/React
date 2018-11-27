import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import { areas } from '../components/bd/area.json';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';

class AdminTech extends React.Component {

    constructor(props) {
        super();
        this.state = {
            areas
        }

        super(props);

        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }


    render() {
        const areasTable = this.state.areas.map((area) => {
            return (
                <tr>
                    <th scope="row">{area.nombre}</th>
                    <td><button class="btn btn-primary  " type="submit"><EditIcon />  Editar</button></td>
                    <td><button class="btn btn-danger  " type="submit"><DeleteIcon />  Eliminar</button></td>
                </tr>

            )
        })
        return (
            <div>
                <Navigation />
                <div className="container ">

                    <div className="row ">
                        <div className="col mt-4 ">
                            <br /><br />
                            <div>
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label>Buscar</label>
                                        <input type="text" className="form-control" id="myInput" placeholder="Nombre Tecnología" />
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label>Agregar</label>
                                        <input type="text" className="form-control" id="validationCustom02" placeholder="Nombre Tecnología" />
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label>Tipo de Tecnología</label>

                                        <select class="form-control" id="">
                                            <option disabled="true" selected="true">Tipo de Tecnología</option>
                                            <option>Software</option>
                                            <option>Hardware</option>
                                        </select>
                                    </div>

                                   <div className="col-md-2 mb-3">
                                        <label>Área</label>

                                        <select class="btn" id="">
                                            <option disabled="true" selected="true">Tipo de Tecnología</option>
                                            <option>Redes</option>
                                            <option>Bases de datos</option>
                                            <option>Producción</option>
                                        </select>
                                    </div>

                                    <div className="col-md-2 mb-3">
                                        <br/>
                                        <button class="btn  " id="" type="submit"><AddIcon />  Agregar</button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="container table-responsive " id="main_div">
                    <table className="table table-hover table-condensed " id="table_id">
                        <thead>
                            <tr>
                                <th className="size" scope="col">Nombre</th>
                                <th className="size" scope="col"></th>
                                <th className="size" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="myTable">
                            {areasTable}

                        </tbody>
                    </table>
                </div>
            </div>
         
        )
    }
}
export default AdminTech;
