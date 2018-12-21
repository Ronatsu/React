import '../components/ButtonColor.css';
import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Button, Modal, FormControl } from 'react-bootstrap';
import { func } from 'prop-types';
import { Input } from '@material-ui/core';
import axios from 'axios';
import SelectComponentArea from '../Administrator/SelectComponentArea';
import SelectArea from '../Administrator/SelectArea'

class AdminTipoIncidencia extends React.Component {

    constructor(props) {
        super();
        super(props);
        this.state = {
            areas: [],
            tecno: [],
            NombreArea: '',
            selectGeneric: '',
            selectArea: '',
            AreaIDBorrar: '',
            AreaIDModificar: '',
            NombreAreaModificar: '',
            SelectAreaTecnologiaModificar: '',
            SelectAreaPrincipalModificar: ''
            , tecnoAdd: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.borrar = this.borrar.bind(this);
        this.AreaModificar = this.AreaModificar.bind(this);





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
                const cell = $(this).parents("tr").find("th").eq(0).text();
                $("#titleModal").html("Editando " + cell);

            })
        })
    }

    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
    }

    handleSubmit = event => {
        event.preventDefault();


        axios.post(`http://localhost:44372/api/AdministracionAreaTecnologia/InsertarArea`, {
            NombreArea: this.state.NombreArea,
            tecnologiaFk: this.state.selectGeneric,
            AreaFk: this.state.selectArea

        }).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    componentWillMount() {
        axios.get(`http://localhost:44372/api/AdministracionAreaTecnologia/Area`)
            .then(res => {
                const areas = res.data;
                this.setState({ areas });
            })

        axios.get('http://localhost:44372/api/AdministracionAreaTecnologia/Tecnologia')
            .then(res => {
                const tecno = res.data;
                this.setState({ tecno });
            })
    }


    borrar(Area) {
        alert("Se selecciono el ID : " + Area);
        axios.post(`http://localhost:44372/api/AdministracionAreaTecnologia/eliminarArea`, {
            AreaID: Area
        }).then(res => {
            if (res.status == 200) {
                alert("Se elimino exitosamente");
            }
        })


    }


    AreaModificar(Area) {
        alert("Se selecciono el ID : " + Area);
        this.setState({
            AreaIDModificar: Area
        });


    }


    ModificarArea() {

        alert("Se selecciono el ID : " + this.state.AreaIDModificar);
        if (this.state.NombreAreaModificar == "") {
            alert("Inserte el nombre del área que desea modificar.");
        } else {
            if (this.state.SelectAreaTecnologiaModificar == "") {
                alert("Seleccione la tecnologia del área que desea modificar.");
            }
            else {
                if (this.state.SelectAreaPrincipalModificar == "") {
                    alert("Seleccione la tecnologia del área que desea modificar.");
                } else {
                    alert("Llego aqui");
                    axios.post(`http://localhost:58055/api/AdministracionAreaTecnologia/modificarArea`, {
                        AreaID: this.state.AreaIDModificar,
                        NombreArea: this.state.NombreAreaModificar,
                        TecnologiaFk: this.state.SelectAreaTecnologiaModificar,
                        AreaFk: this.state.SelectAreaPrincipalModificar
                    }).then(res => {
                        if (res.status == 200) {
                            alert("Se modifico exitosamente");
                        }
                    })
                }
            }
        }
    }


    render() {
        const listaTecnologia = this.state.tecno.map((tecnologia) =>
            <option value={tecnologia.nombreTecnologia}>{tecnologia.nombreTecnologia}</option>
        );

        const listaArea = this.state.areas.map((area) =>
            <option value={area.nombreArea}>{area.nombreArea}</option>
        );

        return (
            <div>
                <Navigation />
                <div className="container ">

                    <div className="row ">
                        <div className="col mt-4 ">
                            <br /><br />
                            <div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" id="myInput" placeholder="Buscar" />
                                    </div>

                                    <div className="col-md-6 mb-3 pagination justify-content-end">
                                        <button data-toggle="modal" href="#myModal" className="btn btnGrey"><AddIcon />  Agregar</button>
                                        <div id="myModal" className="modal fade in">
                                            <Modal.Dialog>
                                                <Modal.Header>
                                                    <Modal.Title id="titleModal">
                                                        <h3 id="txtModal">
                                                            Agregar un nuevo tipo de incidencia
                                                        </h3>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="form-group">
                                                        <label id="txtModal">Tipo de incidencia</label>
                                                        <FormControl className="form-control" name="NombreArea" value={this.state.NombreArea} onChange={this.handleChange} placeholder="Tipo de incidencia"></FormControl>
                                                    </div>
                                                    
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                                                    <Button id="close" className="btnBlue" data-dismiss="modal" onClick={this.handleSubmit}>Agregar</Button>
                                                </Modal.Footer>
                                            </Modal.Dialog>
                                        </div>

                                    </div>
                                       


                              

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="table-responsive " id="main_div">
                        <table className="table table-hover table-condensed " id="table_id">
                            <thead>
                                <tr>
                                    <th className="size" scope="col">Código</th>
                                    <th className="size" scope="col">Tipo de incidencia</th>
                                    <th className="size" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {this.state.areas.map(elemento => {
                                    return (
                                        <tr key={elemento.areaID}>
                                            <td>
                                                {elemento.areaID}
                                            </td>
                                            <td>
                                                {elemento.nombreArea}
                                            </td>
                                            <td className="pagination justify-content-center">
                                                <button className="btn btnBlue" data-toggle="modal" href="#modal2" type="submit" onClick={() => this.AreaModificar(elemento.areaID)}><EditIcon />  Editar</button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>



                <div className="container" id="modal2">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title id="titleModal">Modificar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Tipo incidencia</label>
                            <FormControl className="form-control" name="NombreAreaModificar" value={this.state.NombreAreaModificar} onChange={this.handleChange} placeholder="Tipo de incidencia"></FormControl>
                            <div className="form-group">
                            <label>Estado</label>
                            <select className="form-control container" id="exampleFormControlSelect1" name="SelectAreaTecnologiaModificar" onClick={this.handleChange}>
                                {listaTecnologia}
                            </select>
                            </div>
                           
                        </Modal.Body>

                        <Modal.Footer>
                            <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                            <Button id="close" className="btnBlue" data-dismiss="modal" onClick={() => this.ModificarArea()}>Aceptar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>


            </div>
        )
    }
}
export default AdminTipoIncidencia;