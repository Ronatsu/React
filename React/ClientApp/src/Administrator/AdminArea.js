import '../components/ButtonColor.css';
import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import { areas } from '../components/bd/area.json';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Button, Modal, FormControl } from 'react-bootstrap'
import { func } from 'prop-types';
import { Input } from '@material-ui/core';
import { dark } from '@material-ui/core/styles/createPalette';

class AdminArea extends React.Component {

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

        $(document).ready(function () {
            $(".btnBlue").click(function () {
                $(this).each(function () {
                    $("#modal2").show();
                    $("#close").click(function () {
                        $("#modal2").css("display", "none");
                    });
                });
            });
        });


        $(function () {
            $("#myTable tr td").click(function () {
                const cell = $(this).parents("tr").find("th").eq(0).text();//$(this).index(0).text();
                /*const row = $(this).parents('tr').index();
                const contenido = $(this).html();
                $("#result").html('fila= ' + row + " columna= " + cell + " Contenido= " + contenido)*/
                $("#titleModal").html("Editando " + cell);

            })
        })
    }


    render() {
        const areasTable = this.state.areas.map((area) => {
            return (
                <tr>
                    <th scope="row">{area.nombre}</th>
                    <td><button className="btn btnBlue" type="submit"><EditIcon />  Editar</button>
                        <button className="btn btnRed" type="submit"><DeleteIcon />  Eliminar</button></td>
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
                                    <div className="col-md-3 mb-3">
                                        <label>Buscar</label>
                                        <input type="text" className="form-control" id="myInput" placeholder="Buscar el área" />
                                    </div>
                                    <div className="col-md-1 mb-3">
                                       
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Agregar</label>
                                        <input type="text" className="form-control" id="validationCustom02" placeholder="Nombre del área" />
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label>Tecnología</label>
                                        <div className=" justify-content-end">
                                            {Select_Tech("btn")}                                     
                                        </div>
                                    </div>
                                    <div className="col-md-1 mb-3">
                                        <label>Crítico</label>
                                        <div className=" justify-content-end">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                            <option>Sí</option>
                                            <option>No</option>
                                                </select>
                                        </div>
                                        
                                    </div>

                                    <div className="col-md-1 mb-3">
                                      <br/>
                                        <button class=" btn btnGrey " type="submit"><AddIcon />  Agregar</button>
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

                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {areasTable}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="container" id="modal2">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title id="titleModal"></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl className="form-control" placeholder="Nombre del area"></FormControl>
                            <br />
                            {Select_Tech("form-control container")}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button id="close" className="btnRed">Cancelar</Button>
                            <Button id="close" className="btnBlue">Aceptar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>
        )
    }
}
function Select_Tech(styleClassName) {
    return (

        <select className={styleClassName} id="exampleFormControlSelect1">
            <option>Router Cisco</option>
            <option>Servidor A-97r</option>
            <option>SQL Azure</option>
            <option>Windows 2016</option>
            <option>Log Storage Activy</option>
        </select>
    );
}
export default AdminArea;