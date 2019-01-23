import React from 'react';
import './Block_User.css';
import Navigation from '../components/Navigation';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import '../components/ButtonColor.css';
import { Button, Modal, FormControl } from 'react-bootstrap'
import axios from 'axios';
import AuthService from '../components/AuthService';
import $ from 'jquery';
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';

class AdminTech extends React.Component {

    constructor(props) {
        super();
        super(props);
        this.state = {
            tecnologias: [],
            nombreTecnologia: '',
            nombre: '',
            criticoS_N: '',
            tecnologiaID: '',
            SelectTipoTecnologiaModificar: "",
            criticoS_N_Modificar: "",
            nombreTecnologiaModificar: ""
            , estadoActual: ''
            , estadoNuevo: ''
            , estados: []
            , tipos: []
            , tipo: ''
            , tipoTecnologia: ''
        }
        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit = event => {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }
        event.preventDefault();
        if (this.state.estadoNuevo === "Estado" || this.state.estadoNuevo === "") {
            alert("Favor seleccione un estado")
        } else if (this.state.nombre === "") {
            alert("Favor ingrese un el nombre de la tecnología que desea agregar")
        } else if (this.state.criticoS_N === "¿Es crítico?") {
            alert("Favor selecione si es crítico o no")
        } else if (this.state.tipo === "" || this.state.tipo === "Tipo tecnología") {
            alert("Favor selecione el tipo de tecnología")
        } else {
            axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/InsertarTecnologia`, 
                {
                    nombre: this.state.nombreTecnologia,
                    tipoTecnologia: this.state.tipo,
                    critico: this.state.criticoS_N
                    , Estado: this.state.estadoNuevo

                },
                {
                    headers: { 'Authorization': headerOptions }
                }
                
            ).then(res => {
                if (res.data === "") {
                    alert("Agregado con éxito")
                    this.setState({
                        estadoNuevo: ""
                        , nombre: ""
                    });
                } else {
                    alert("¡Lo sentimos! " + res.data + " ya existe")
                }
            })
        }
    }

    TecnologiaModificar(tecnoID) {
        this.setState({
            tecnologiaID: tecnoID
        });
        this.GetTypeTechnology(tecnoID)
    }

    GetTypeTechnology(tecnoID) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/MethodGetTypeTech`,
            {
                TecnologiaId: tecnoID
            },
            {
                headers: { 'Authorization': headerOptions }
            }


        ).then(res => {
            const Technology = res.data;
            this.setState({
                criticoS_N_Modificar: Technology.critico,
                nombreTecnologiaModificar: Technology.nombreTecnologia,
                SelectTipoTecnologiaModificar: Technology.tipoTecnologiaNombre,
                nombreTecnologia: Technology.nombreTecnologia
                , estadoActual: Technology.estado
                , estado: Technology.estado
            });
        })
    }


    componentWillMount() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44357/api/AdministracionAreaTecnologia/Tecnologia`, { headers: { "Authorization": headerOptions } })
            .then(res => {
                const tecnologias = res.data;
                this.setState({ tecnologias: tecnologias });
            })
        axios.get(`https://localhost:44357/api/AdministracionAreaTecnologia/TipoTecnologia`, { headers: { "Authorization": headerOptions } })
            .then(res => {
                const tiposTecnologia = res.data;
                this.setState({
                    tipos: tiposTecnologia
                });

            })

        axios.get('https://localhost:44357/api/TipoIncidencia/GetEstados', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const estados = res.data;
                this.setState({ estados });
            })


    }

    ModificarTecnologia() {
        if (this.state.NombreAreaModificar === "") {
            alert("Inserte el nombre del área que desea modificar.");
        } else {
            if (this.state.SelectAreaTecnologiaModificar === "") {
                alert("Seleccione la tecnologia del área que desea modificar.");
            }
            else {
                if (this.state.SelectAreaPrincipalModificar === "") {
                    alert("Seleccione la tecnologia del área que desea modificar.");
                } else {

                    if (this.Auth.loggedIn()) {
                        var headerOptions = "Bearer " + this.Auth.getToken()

                    }
                  
                    axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/modificarTecnologia`, 
                        {
                            TecnologiaId: this.state.tecnologiaID,
                            NombreTecnologia: this.state.nombreTecnologiaModificar,
                            TipoTecnologia: this.state.SelectTipoTecnologiaModificar,
                            Critico: this.state.criticoS_N_Modificar
                            , Estado: this.state.estado
                        },
                        {
                            headers: { 'Authorization': headerOptions }
                        }
                    ).then(res => {
                        if (res.status === 200) {
                            alert("Se modifico exitosamente");
                        }
                    })
                }
            }
        }
    }


    recargar() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44357/api/AdministracionAreaTecnologia/Tecnologia`, { headers: { "Authorization": headerOptions } })
            .then(res => {
                const tecnologias = res.data;
                this.setState({ tecnologias: tecnologias });
            })
    }
    render() {

        if (this.Auth.isAdmin()) {

            this.recargar();

            const listaTipoTecnologia = this.state.tipos.map((tipoTecno) =>
                <option value={tipoTecno.tipO_TECNOLOGIA_ID}>{tipoTecno.tipO_TECNOLOGIA}</option>
            );

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
                                            <br />
                                            <button className="btn btnGrey" id="" type="submit" data-toggle="modal" href="#modalAgregar"><AddIcon />  Agregar</button>
                                        </div>
                                        <div id="modalAgregar" className="modal fade in">
                                            <Modal.Dialog>
                                                <Modal.Header>
                                                    <Modal.Title id="titleModal">
                                                        <h3 id="txtModal">
                                                            Agregar una nueva tecnología
                                                        </h3>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="form-group">
                                                        <label id="txtModal">Tipo de incidencia</label>
                                                        <FormControl className="form-control" name="nombre" value={this.state.nombre} onChange={this.handleChange} placeholder="Tecnología"></FormControl>
                                                    </div>

                                                    <div className="form-group">
                                                        <label id="txtModal">Tipo de Tecnología</label>
                                                        <select name="tipo" onClick={this.handleChange} className="form-control">
                                                            <option disabled selected="selected">Tipo tecnología</option>
                                                            {listaTipoTecnologia}
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label id="txtModal">Crítico</label>
                                                        <select className="form-control" id="exampleFormControlSelect1" name="criticoS_N" onClick={this.handleChange}>
                                                            <option disabled selected="selected">¿Es crítico?</option>
                                                            <option value="s">Sí</option>
                                                            <option value="n">No</option>
                                                        </select>
                                                    </div>

                                                    <div id="txtModal" className="form-group">
                                                        <label>Estado</label>
                                                        <select className="form-control container" id="exampleFormControlSelect1" name="estadoNuevo" onClick={this.handleChange}>
                                                            <option disabled selected="selected">Estado</option>
                                                            {listaEstado}

                                                        </select>
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
                    <div className="container table-responsive " id="main_div">
                        <table className="table table-hover table-condensed " id="table_id">
                            <thead>
                                <tr>
                                    <th className="size" scope="col">Código</th>
                                    <th className="size" scope="col">Nombre</th>
                                    <th className="size" scope="col">Tipo Tecnología</th>
                                    <th className="size" scope="col">Crítico</th>
                                    <th className="size" scope="col">Estado</th>
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
                                                {elemento.tipoTecnologia}
                                            </td>
                                            <td>
                                                {elemento.critico}
                                            </td>
                                            <td>
                                                {elemento.estado}
                                            </td>
                                            <td>
                                                <button className="btn btnBlue" type="submit" data-toggle="modal" href="#modal2" onClick={() => this.TecnologiaModificar(elemento.tecnologiaId)}><EditIcon />  Editar</button>
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
                                <select className="form-control" id="exampleFormControlSelect1" name="criticoS_N_Modificar" onChange={this.handleChange}>
                                    <option disabled selected>{this.state.criticoS_N_Modificar}</option>
                                    <option value="s">Sí</option>
                                    <option value="n">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label id="txtModal">Estado</label>
                                <select className="form-control container" name="estado" onChange={this.handleChange}>
                                    <option disabled selected="selected">{this.state.estadoActual}</option>
                                    {listaEstado}

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
export default AdminTech;
