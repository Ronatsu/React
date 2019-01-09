import '../components/ButtonColor.css';
import React from 'react';
import './Block_User.css';
import Navigation from '../components/Navigation';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Button, Modal, FormControl } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import AuthService from '../components/AuthService';


class AdminTipoIncidencia extends React.Component {

    constructor(props) {
        super();
        super(props);
        this.state = {
            tipos: []
            , estados: []
            , nombre: ''
            , estado: ""
            , id: ""
            , estadoActual: ''
            , nombreNuevo: ''
            , estadoNuevo: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitAgregar = this.handleSubmitAgregar.bind(this);
        this.ModificarTipo = this.ModificarTipo.bind(this);

        this.Auth = new AuthService();
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
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

    handleSubmitModificar = event => {
        event.preventDefault();

        if (this.state.estado === "Estado" || this.state.estado === "") {
            alert("Favor seleccione un estado")
        } else if (this.state.nombre === "") {
            alert("Favor ingrese un el nombre del tipo de incidencia que desea modificar")
        } else {

            if (this.Auth.loggedIn()) {
                var headerOptions = "Bearer " + this.Auth.getToken()

            }

            axios.post(`http://localhost:44372/api/TipoIncidencia/ModificarTipo`,
                {
                    Descripcion: this.state.nombre,
                    Estado: this.state.estado,
                    Id: this.state.id
                },
                {
                    headers: { 'Authorization': headerOptions }
                }
            ).then(res => {

                if (res.status === 200) {
                    alert("Modificado con éxito")
                } else {
                    alert("¡Lo sentimos! Ha ocurrido un error inesperado\n")

                }
            })
        }
    }

    handleSubmitAgregar = event => {
        event.preventDefault();

        if (this.state.estadoNuevo === "Estado" || this.state.estadoNuevo === "") {
            alert("Favor seleccione un estado")
        } else if (this.state.nombreNuevo === "") {
            alert("Favor ingrese un el nombre del tipo de incidencia que desea agregar")
        } else {

            if (this.Auth.loggedIn()) {
                var headerOptions = "Bearer " + this.Auth.getToken()

            }

            axios.post(`http://localhost:44372/api/TipoIncidencia/AgregarTipo`,
                {
                    Descripcion: this.state.nombreNuevo,
                    Estado: this.state.estadoNuevo
                },
                {
                    headers: { 'Authorization': headerOptions }
                }

            ).then(res => {

                if (res.status === 200) {
                    alert("Agregado con éxito")
                    this.setState({
                        estadoNuevo: ""
                        , nombreNuevo: ""
                    });
                } else {
                    alert("¡Lo sentimos! Ha ocurrido un error inesperado\n")

                }
            })
        }
    }

    componentWillMount() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get('https://localhost:44331/api/TipoIncidencia/GetTipos', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const tipos = res.data;
                this.setState({ tipos });
            })
        axios.get('http://localhost:44372/api/TipoIncidencia/GetEstados', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const estados = res.data;
                this.setState({ estados });
            })
    }


    ModificarTipo(id) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`http://localhost:44372/api/TipoIncidencia/ObtenerPorId`,
            {
                id: id
            },
            {
                headers: { 'Authorization': headerOptions }
            }


        ).then(res => {
            const tipoI = res.data;
            this.setState({
                nombre: tipoI.descripcion,
                estadoActual: tipoI.estado
                , id: id
            });
        })
        axios.get('http://localhost:44372/api/TipoIncidencia/GetEstados', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const estados = res.data;
                this.setState({ estados });
            })
    }

    recargar() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get('http://localhost:44372/api/TipoIncidencia/GetTipos', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const tipos = res.data;
                this.setState({ tipos });
            })
    }

    render() {

        this.recargar();

        const listaEstados = this.state.estados;

        const listaEstado = listaEstados.map((estado) =>
            <option value={estado.id}>{estado.estado}</option>
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
                                                        <FormControl className="form-control" name="nombreNuevo" value={this.state.nombreNuevo} onChange={this.handleChange} placeholder="Tipo de incidencia"></FormControl>
                                                    </div>

                                                    <div className="form-group">
                                                        <label id="txtModal">Estado</label>
                                                        <select className="form-control container" id="exampleFormControlSelect1" name="estadoNuevo" onClick={this.handleChange}>
                                                            <option disabled selected="selected">Estado</option>
                                                            {listaEstado}

                                                        </select>
                                                    </div>

                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                                                    <Button id="close" className="btnBlue" data-dismiss="modal" onClick={this.handleSubmitAgregar}>Agregar</Button>
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
                                    <th className="size" scope="col">Estado</th>
                                    <th className="size" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {this.state.tipos.map(tipo => {
                                    return (
                                        <tr key={tipo.id}>
                                            <td>
                                                {tipo.id}
                                            </td>
                                            <td>
                                                {tipo.descripcion}
                                            </td>
                                            <td>
                                                {tipo.estado}
                                            </td>

                                            <td className="pagination justify-content-center">
                                                <button className="btn btnBlue" data-toggle="modal" href="#modal2" type="submit" onClick={() => this.ModificarTipo(tipo.id)}><EditIcon />  Editar</button>
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
                            <FormControl className="form-control" name="nombre" value={this.state.nombre} onChange={this.handleChange} placeholder="Tipo de incidencia"></FormControl>
                            <div className="form-group">
                                <label id="txtModal">Estado</label>
                                <select className="form-control container" name="estado" onClick={this.handleChange}>
                                    <option disabled selected="selected">{this.state.estadoActual}</option>
                                    {listaEstado}

                                </select>
                            </div>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                            <Button className="btnBlue" data-dismiss="modal" onClick={this.handleSubmitModificar}>Aceptar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>


            </div>
        )
    }
}
export default AdminTipoIncidencia;