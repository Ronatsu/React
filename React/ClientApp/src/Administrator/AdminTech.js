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
import SelectArea from '../Administrator/SelectArea';

class AdminTech extends React.Component {

    constructor(props) {
        super();
        super(props);
        this.state = {
            areas: [],
            tecno: [],
            area: [],
            nombreTecnologia: '',
            selectGeneric: '',
            selectArea: '',
            criticoS_N: ''
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


        $(function () {
            $("#myTable tr td").click(function () {
                const cell = $(this).parents("tr").find("th").eq(0).text();//$(this).index(0).text();
                /*const row = $(this).parents('tr').index();
                const contenido = $(this).html();
                $("#result").html('fila= ' + row + " columna= " + cell + " Contenido= " + contenido)*/
                $("#titleModal").html("Editando " + cell)

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
        
        axios.post(`http://localhost:58055/api/AdministracionAreaTecnologia/InsertarTecnologia`, {
            nombreTecnologia: this.state.nombreTecnologia,
            tipoTecnologiaFk: this.state.selectGeneric,
            criticoS_N: this.state.criticoS_N
        })

        alert("Valor: " + this.state.criticoS_N);
        
    }

    borrar(tecnologiaBorrar) {

        alert("Se selecciono el ID : " + tecnologiaBorrar);
        axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/eliminarTecnologia`, {
            TecnologiaId: tecnologiaBorrar
        }).then(res => {
            if (res.status == 200) {
                alert("Se elimino exitosamente");
            }
        })


    }


    componentWillMount() {
        axios.get(`http://localhost:58055/api/AdministracionAreaTecnologia/Tecnologia`)
            .then(res => {
                const areas = res.data;
                this.setState({ areas: areas });
            })

        axios.get(`http://localhost:58055/api/AdministracionAreaTecnologia/TipoTecnologia`)
            .then(res => {
                const tecno = res.data;
                this.setState({ tecno });
            })


        axios.get(`http://localhost:58055/api/AdministracionAreaTecnologia/Area`)
            .then(res => {
                const area = res.data;
                this.setState({ area });
            })
    }

    render() {
        const areasTable = this.state.areas.map((area) => {
            return (
                <tr >
                    <th scope="row">{area.nombreTecnologia}</th>
                    <td><button class="btn btnBlue" type="submit"  ><EditIcon />  Editar</button>
                        <button class="btn btnRed" type="submit"><DeleteIcon />  Eliminar</button></td>
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
                                        <input type="text" className="form-control" id="myInput" placeholder="Buscar la tecnología" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Agregar</label>
                                        <input type="text" className="form-control" id="validationCustom02" name="nombreTecnologia" value={this.state.nombreTecnologia} onChange={this.handleChange} placeholder="Nombre de la tecnología" />
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label>Tipo de Tecnología</label>
                                        <SelectComponent
                                            tecno={this.state.tecno}
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
                            {this.state.areas.map(elemento => {
                                return (
                                    <tr key={elemento.tecnologiaId}>
                                        <td>
                                            {elemento.tecnologiaId}
                                        </td>
                                        <td>
                                            {elemento.nombreTecnologia}
                                        </td>
                                        <td>
                                            <button className="btn btnBlue" type="submit"><EditIcon />  Editar</button>
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
                            <Modal.Title id="titleModal" />
                        </Modal.Header>
                        <Modal.Body>
                            <label>Nombre del area</label>
                            <FormControl className="form-control" placeholder="Nombre del área"></FormControl>
                            <br />
                            <label>Tipo de Tecnología</label>
                            {Select_Type_Technology()}
                            <br />
                            <label>Área</label>
                            {Select_Area()}

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
function Select_Type_Technology() {
    return (

        <select className="form-control" id="">
            <option disabled="true" selected="true">Tipo de Tecnología</option>
            <option>Software</option>
            <option>Hardware</option>
        </select>
    );
}

function Select_Area() {
    return (

        <select className="form-control" id="">
            <option disabled="true" selected="true">Área</option>
            <option>Redes</option>
            <option>Bases de datos</option>
            <option>Producción</option>
        </select>
    );
}
export default AdminTech;
