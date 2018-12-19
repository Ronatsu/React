import '../components/ButtonColor.css';
import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Button, Modal, FormControl } from 'react-bootstrap'
import { func } from 'prop-types';
import { Input } from '@material-ui/core';
import axios from 'axios';
import SelectComponentArea from '../Administrator/SelectComponentArea';
import SelectArea from '../Administrator/SelectArea'

class AdminArea extends React.Component {

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
            , tecnoAdd:""
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
                const cell = $(this).parents("tr").find("th").eq(0).text();//$(this).index(0).text();
                /*const row = $(this).parents('tr').index();
                const contenido = $(this).html();
                $("#result").html('fila= ' + row + " columna= " + cell + " Contenido= " + contenido)*/
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


        axios.post(`http://localhost:58055/api/AdministracionAreaTecnologia/InsertarArea`, {
            NombreArea: this.state.NombreArea,
            tecnologiaFk: this.state.selectGeneric,
            AreaFk: this.state.selectArea

        }).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    componentWillMount() {
        axios.get(`http://localhost:58055/api/AdministracionAreaTecnologia/Area`)
            .then(res => {
                const areas = res.data;
                this.setState({ areas });
            })

        axios.get('http://localhost:58055/api/AdministracionAreaTecnologia/Tecnologia')
            .then(res => {
                const tecno = res.data;
                this.setState({ tecno });
            })
    }


    borrar(Area) {

        alert("Se selecciono el ID : " + Area);
        axios.post(`http://localhost:58055/api/AdministracionAreaTecnologia/eliminarArea`, {
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
                                    <div className="col-md-3 mb-3">
                                        <label>Buscar</label>
                                        <input type="text" className="form-control" id="myInput" placeholder="Buscar el área" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Agregar</label>
                                        <input type="text" className="form-control" id="validationCustom02" name="NombreArea" value={this.state.NombreArea} onChange={this.handleChange} placeholder="Nombre del área" />
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label>Tecnología</label>
                                        <div className=" justify-content-end">
                                            <SelectComponentArea
                                                tecno={this.state.tecno}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label>Área principal</label>
                                        <div className=" justify-content-end">
                                            <SelectArea
                                                area={this.state.areas}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-1 mb-3">
                                        <br />
                                        <div id="myModal" className="modal fade in">
                                            <Modal.Dialog>
                                                <Modal.Header>
                                                    <Modal.Title id="titleModal">
                                                        <h3 id="txtModal">
                                                            Agregar una nueva área
                                                        </h3>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="form-group">
                                                    <label id="txtModal">Nombre del área</label>
                                                        <FormControl className="form-control" name="NombreArea" value={this.state.NombreArea} onChange={this.handleChange} placeholder="Nombre del area"></FormControl>
                                                    </div>
                                                    <label id="txtModal">Seleccione la tecnología</label>
                                                    <select className="form-control container" id="exampleFormControlSelect1" name="selectGeneric" onClick={this.handleChange}>
                                                        {listaTecnologia}
                                                    </select>
                                                    <br />
                                                    <label id="txtModal">Seleccione el área principal</label>
                                                    <select className="form-control container" id="exampleFormControlSelect1" name="SelectArea" onClick={this.handleChange}>
                                                        {listaArea}
                                                    </select>
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                                                    <Button id="close" className="btnBlue" data-dismiss="modal" onClick={this.handleSubmit}>Agregar</Button>
                                                </Modal.Footer>
                                            </Modal.Dialog>
                                        </div>
                                        <button data-toggle="modal" href="#myModal" className="btn btnGrey">Insertar Pasos</button>
                                        <button class=" btn btnGrey " type="submit" onClick={this.handleSubmit}><AddIcon />  Agregar</button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="container table-responsive " id="main_div">
                        <table className="table table-hover table-condensed " id="table_id">
                            <thead>
                                <tr>
                                    <th className="size" scope="col">Área ID</th>
                                    <th className="size" scope="col">Nombre</th>
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
                                            <td>
                                                <button className="btn btnBlue" data-toggle="modal" href="#modal2" type="submit" onClick={() => this.AreaModificar(elemento.areaID)}><EditIcon />  Editar</button>
                                                <button className="btn btnRed" type="submit" onClick={() => this.borrar(elemento.areaID)}><DeleteIcon />  Eliminar</button>
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
                            <Modal.Title id="titleModal">Modificación de área</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Nombre del área</label>
                            <FormControl className="form-control" name="NombreAreaModificar" value={this.state.NombreAreaModificar} onChange={this.handleChange} placeholder="Nombre del area"></FormControl>
                            <br />
                            <label>Seleccione la tecnología</label>
                            <select className="form-control container" id="exampleFormControlSelect1" name="SelectAreaTecnologiaModificar" onClick={this.handleChange}>
                                {listaTecnologia}
                            </select>
                            <br />
                            <label>Seleccione el área principal</label>
                            <select className="form-control container" id="exampleFormControlSelect1" name="SelectAreaPrincipalModificar" onClick={this.handleChange}>
                                {listaArea}
                            </select>
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


//function Select_Tech(styleClassName , ) {

//    return (

//        <select className={styleClassName} id="exampleFormControlSelect1" name="tecnologia">
//            {listaTipoTecnologia}
//        </select>
//    );
//}
export default AdminArea;