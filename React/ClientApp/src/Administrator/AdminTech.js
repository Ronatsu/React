import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
//import { areas } from '../components/bd/area.json';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import '../components/ButtonColor.css';
import { Button, Modal, FormControl } from 'react-bootstrap'
import axios from 'axios';
import SelectComponent from '../Administrator/SelectComponent';

class AdminTech extends React.Component {

    constructor(props) {
        super();
        super(props);
        this.state = {
            tecnologias: [],
            tipoTecno: [],
            nombreTecnologia: '',
            selectGeneric: '',
            selectArea: '',
            criticoS_N: '',
            tecnologiaID: '',
            SelectTipoTecnologiaModificar: "",
            criticoS_N_Modificar: "",
            nombreTecnologiaModificar: "",
        }
        this.handleChange = this.handleChange.bind(this);

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

        axios.post(`http://localhost:44372/api/AdministracionAreaTecnologia/InsertarTecnologia`, {
            nombreTecnologia: this.state.nombreTecnologia,
            tipoTecnologiaFk: this.state.selectGeneric,
            criticoS_N: this.state.criticoS_N
        })
        alert("Valor: " + this.state.criticoS_N);
    }

    TecnologiaModificar(tecnoID) {
        this.setState({
            tecnologiaID: tecnoID
        });
        this.GetTypeTechnology(tecnoID)
    }

    GetTypeTechnology(tecnoID) {
        axios.post(`http://localhost:44372/api/AdministracionAreaTecnologia/MethodGetTypeTech`, {
            TecnologiaId: tecnoID
        }).then(res => {
            const listTypeTechnology = res.data;
            this.setState({
                criticoS_N_Modificar: listTypeTechnology.criticoS_N,
                nombreTecnologiaModificar: listTypeTechnology.nombreTecnologia,
                SelectTipoTecnologiaModificar: listTypeTechnology.tipoTecnologiaNombre,
                nombreTecnologia: listTypeTechnology.nombreTecnologia
            });
        })
    }

    borrar(tecnologiaBorrar) {

        alert("Se selecciono el ID : " + tecnologiaBorrar);
        axios.post(`http://localhost:44372/api/AdministracionAreaTecnologia/eliminarTecnologia`, {
            TecnologiaId: tecnologiaBorrar
        }).then(res => {
            if (res.status == 200) {
                alert("Se elimino exitosamente");
            }
        })
    }


    componentWillMount() {
        axios.get(`http://localhost:44372/api/AdministracionAreaTecnologia/Tecnologia`)
            .then(res => {
                const tecnologias = res.data;
                this.setState({ tecnologias: tecnologias });
            })

        axios.get(`http://localhost:44372/api/AdministracionAreaTecnologia/TipoTecnologia`)
            .then(res => {
                const tipoTecno = res.data;
                this.setState({ tipoTecno });
            })
    }


    ModificarTecnologia() {

        alert("Se selecciono el ID : " + this.state.tecnologiaID);
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
                    axios.post(`http://localhost:44372/api/AdministracionAreaTecnologia/modificarTecnologia`, {
                        TecnologiaId: this.state.tecnologiaID,
                        NombreTecnologia: this.state.nombreTecnologiaModificar,
                        TipoTecnologiaFk: this.state.SelectTipoTecnologiaModificar,
                        CriticoS_N: this.state.criticoS_N_Modificar
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
        const listaTipoTecnologia = this.state.tipoTecno.map((tipoTecnologia) =>
            <option value={tipoTecnologia.tipO_TECNOLOGIA}>{tipoTecnologia.tipO_TECNOLOGIA}</option>
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
                                        <input type="text" className="form-control" id="myInput" placeholder="Buscar la tecnología" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Agregar</label>
                                        <input type="text" className="form-control" id="validationCustom02" name="nombreTecnologia" value={this.state.nombreTecnologia} onChange={this.handleChange} placeholder="Nombre de la tecnología" />
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label>Tipo de Tecnología</label>
                                        <SelectComponent
                                            tecno={this.state.tipoTecno}
                                            handleChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-md-2 mb-3">
                                        <label>Crítico</label>
                                        <div className=" justify-content-end">
                                            <select className="form-control" id="exampleFormControlSelect1" name="criticoS_N" onClick={this.handleChange}>
                                                <option value="s">Sí</option>
                                                <option value="n">No</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="col-md-2 mb-3">
                                        <br />
                                        <button className="btn btnGrey" id="" type="submit" onClick={this.handleSubmit}><AddIcon />  Agregar</button>
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
                                <th className="size" scope="col">Tecnología ID</th>
                                <th className="size" scope="col">Nombre</th>
                                <th className="size" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="myTable">
                            {this.state.tecnologias.map(elemento => {
                                return (
                                    <tr key={elemento.tecnologiaId}>
                                        <td>
                                            {elemento.tecnologiaId}
                                        </td>
                                        <td>
                                            {elemento.nombreTecnologia}
                                        </td>
                                        <td>
                                            <button className="btn btnBlue" type="submit" data-toggle="modal" href="#modal2" onClick={() => this.TecnologiaModificar(elemento.tecnologiaId)}><EditIcon />  Editar</button>
                                            <button className="btn btnRed" type="submit" onClick={() => this.borrar(elemento.tecnologiaId)}><DeleteIcon />  Eliminar</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <div className="container" id="modal2">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title id="titleModal"> Editando {this.state.nombreTecnologia}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Nombre de la tecnología</label>
                            <input className="form-control" placeholder="Nombre de la tecnología" name="nombreTecnologiaModificar" value={this.state.nombreTecnologiaModificar} onChange={this.handleChange}></input>
                            <br />
                            <label>Tipo de Tecnología</label>
                            <select className="form-control container" id="exampleFormControlSelect1" name="SelectTipoTecnologiaModificar" onClick={this.handleChange}>
                                <option selected disabled>
                                    {this.state.SelectTipoTecnologiaModificar}
                                </option>
                                {listaTipoTecnologia}
                            </select>
                            <br />
                            <label>tecnología critica</label>
                            <div className=" justify-content-end">
                                <select className="form-control" id="exampleFormControlSelect1" name="criticoS_N_Modificar" onClick={this.handleChange}>
                                    <option disabled selected>{ShowCritical(this.state.criticoS_N_Modificar)}</option>
                                    <option value="s">Sí</option>
                                    <option value="n">No</option>
                                </select>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                            <Button id="close" className="btnBlue" data-dismiss="modal" onClick={() => this.ModificarTecnologia()}>Aceptar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>

        )
    }
}
function ShowCritical(value) {
    if (value === 's') {
        return 'Sí'
    } else if (value === 'n') {
        return 'No'
    }
}
export default AdminTech;
