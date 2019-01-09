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
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';

class AdminMetodoDeteccion extends React.Component {

    constructor(props) {
        super();
        super(props);
        this.state = {
            metodos: []
            , estados: []
            ,nombreNuevo:""

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitAgregar = this.handleSubmitAgregar.bind(this);
        this.ModificarTipo = this.ModificarMetodo.bind(this);
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
            alert("Favor ingrese un el nombre del método de detección que desea modificar")
        } else {

            if (this.Auth.loggedIn()) {
                var headerOptions = "Bearer " + this.Auth.getToken()

            }

            axios.post(`http://localhost:44372/api/MetodoDeteccion/ModificarMetodo`,
                {
                    MetodoDeteccionNombre: this.state.nombre,
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
       
        if (this.state.estadoNuevo === "") {
            alert("Favor seleccione un estado")
            event.preventDefault();
        } else if (this.state.nombreNuevo === "") {
            alert("Favor ingrese un el nombre del tipo de incidencia que desea agregar")
            event.preventDefault();
        } else {

            if (this.Auth.loggedIn()) {
                var headerOptions = "Bearer " + this.Auth.getToken()

            }

            axios.post(`http://localhost:44372/api/MetodoDeteccion/AgregarMetodo`,
                {
                    MetodoDeteccionNombre: this.state.nombreNuevo,
                    Estado: this.state.estadoNuevo
                },
                {
                    headers: { 'Authorization': headerOptions }
                }


            ).then(res => {

                if (res.data === "") {
                    alert("Agregado con éxito")
                    this.setState({
                        estadoNuevo: ""
                        , nombreNuevo: ""
                    });
                    window.location.reload()
                } else {
                    alert("¡Lo sentimos!"+ res.data+" ya existe")

                }
            })
        }
    }

    componentWillMount() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get('http://localhost:44372/api/MetodoDeteccion/VerMetodos', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const metodos = res.data;
                this.setState({ metodos });
            })
        axios.get('http://localhost:44372/api/TipoIncidencia/GetEstados', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const estados = res.data;
                this.setState({ estados });
            })
    }


    ModificarMetodo(id) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`http://localhost:44372/api/MetodoDeteccion/ObtenerPorId`,
            {
                id: id
            },
            {
                headers: { 'Authorization': headerOptions }
            }

        ).then(res => {
            const tipoI = res.data;
            this.setState({
                nombre: tipoI.metodoDeteccionNombre,
                estadoActual: tipoI.estado
                , id: id
            });
        })
    }

    recargar() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get('http://localhost:44372/api/MetodoDeteccion/VerMetodos', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const metodos = res.data;
                this.setState({ metodos });
            })
    }

    render() {

        if (this.Auth.isAdmin()) {


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
                                                                Agregar un nuevo método de detección
                                                        </h3>
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="form-group">
                                                            <label id="txtModal">Método de detección</label>
                                                            <FormControl className="form-control" name="nombreNuevo" value={this.state.nombreNuevo} onChange={this.handleChange} placeholder="Método de detección"></FormControl>
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
                                                        <Button id="close" className="btnBlue" onClick={this.handleSubmitAgregar}>Agregar</Button>
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
                                        <th className="size" scope="col">Método de detección</th>
                                        <th className="size" scope="col">Estado</th>
                                        <th className="size" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    {this.state.metodos.map(metodo => {
                                        return (
                                            <tr key={metodo.id}>
                                                <td>
                                                    {metodo.id}
                                                </td>
                                                <td>
                                                    {metodo.metodoDeteccionNombre}
                                                </td>
                                                <td>
                                                    {metodo.estado}
                                                </td>

                                                <td className="pagination justify-content-center">
                                                    <button className="btn btnBlue" data-toggle="modal" href="#modal2" type="submit" onClick={() => this.ModificarMetodo(metodo.id)}><EditIcon />  Editar</button>
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
                                <div className="form-group">
                                    <label>Método de detección</label>
                                    <FormControl className="form-control" name="nombre" value={this.state.nombre} onChange={this.handleChange} placeholder="Método de detección"></FormControl>
                                </div>
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
export default AdminMetodoDeteccion;