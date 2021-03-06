import '../components/ButtonColor.css';
import React from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Button, Modal, FormControl } from 'react-bootstrap';
import axios from 'axios';
import AuthService from '../components/AuthService';
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';

class AdminArea extends React.Component {

    constructor(props) {
        super();
        super(props);
        this.state = {
            areas: [],
            areaTecno: [],
            tecno: [],
            estados: [],
            NombreArea: '',
            selectGeneric: '',
            selectArea: '',
            AreaIDBorrar: '',
            AreaIDModificar: '',
            NombreAreaModificar: '',
            SelectAreaTecnologiaModificar: '',
            SelectAreaPrincipalModificar: ''
            , tecnoAdd: ""
            , estadoNuevo: ""
            , estadoActual: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.AreaModificar = this.AreaModificar.bind(this);
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
        alert("Se selecciono el ID : " + this.state.AreaIDModificar);
        if (this.state.NombreArea === "") {
            alert("Inserte el nombre del área que desea modificar.");
        } else if (this.state.selectGeneric === "") {
            alert("Seleccione la tecnologia del área que desea modificar.");
        }
        else if (this.state.selectArea === "") {
            alert("Seleccione la tecnologia del área que desea modificar.");
        } else {
            axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/InsertarArea`,
                {
                    NombreArea: this.state.NombreArea,
                    tecnologiaFk: this.state.selectGeneric,
                    AreaFk: this.state.selectArea,
                    Estado: this.state.estadoNuevo
                },
                {
                    headers: { 'Authorization': headerOptions }
                }



            ).then(res => {
                if (res.data === "") {
                    alert("Agregado con éxito")
                    console.log()
                    this.setState({
                        estadoNuevo: ""
                        , NombreArea: ""
                        , selectGeneric: ""
                        , selectArea: ""
                    });
                } else {
                    alert("¡Lo sentimos! " + res.data + " ya existe")
                }
            })
        }
    }

    componentWillMount() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        const headers = {
            'Authorization': headerOptions
        }
        


        axios.get('https://localhost:44357/api/AdministracionAreaTecnologia/Area', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const areas = res.data;
                this.setState({ areas });
            })

        axios.get('https://localhost:44357/api/AdministracionAreaTecnologia/Tecnologia', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const tecno = res.data;
                this.setState({ tecno });
            })
        axios.get('https://localhost:44357/api/TipoIncidencia/GetEstados', { headers: { "Authorization": headerOptions } })
            .then(res => {
                const estados = res.data;
                this.setState({ estados });
            })
    }

    AreaModificar(Area) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }


        axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/GetAreaPorId`,
            {
                AreaID: Area
            },
            {
                headers: { 'Authorization': headerOptions }
            }

        ).then(res => {
            const area = res.data;
            this.setState({
                AreaIDModificar: Area,
                NombreAreaModificar: area.nombreArea,
                SelectAreaTecnologiaModificar: area.tecnologiaFk,
                SelectAreaPrincipalModificar: area.areaFk,
                estadoActual: area.estado
            });
            })



        axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/ObtenerAreaTecno`,
            {
                TecnologiaId: this.state.SelectAreaTecnologiaModificar
            },
            {
                headers: { 'Authorization': headerOptions }
            }


        ).then(res => {
            const areaTecno = res.data;
            console.log("list " + areaTecno)
            this.setState({ areaTecno });
        })
    }

    cargarAreas = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
        if (valueInput != 0 && valueInput != "Tecnología") {

            if (this.Auth.loggedIn()) {
                var headerOptions = "Bearer " + this.Auth.getToken()

            }

            axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/ObtenerAreaTecno`,
                {
                    TecnologiaId: valueInput
                },
                {
                    headers: { 'Authorization': headerOptions }
                }

            ).then(res => {
                const areaTecno = res.data;
                this.setState({ areaTecno });
            })
        }
    }

    ModificarArea() {
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

                    if (this.Auth.loggedIn()) {
                        var headerOptions = "Bearer " + this.Auth.getToken()

                    }

                    axios.post(`https://localhost:44357/api/AdministracionAreaTecnologia/modificarArea`,
                        {
                            AreaID: this.state.AreaIDModificar,
                            NombreArea: this.state.NombreAreaModificar,
                            TecnologiaFk: this.state.SelectAreaTecnologiaModificar,
                            AreaFk: this.state.SelectAreaPrincipalModificar,
                            Estado: this.state.estado
                        },
                        {
                            headers: { 'Authorization': headerOptions }
                        }

                    ).then(res => {
                        if (res.status == 200) {
                            alert("Se modifico exitosamente");

                        } else {
                            alert("¡Lo sentimos! Ha ocurrido un error inesperado")

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
        axios.get(`https://localhost:44357/api/AdministracionAreaTecnologia/Area`, { headers: { "Authorization": headerOptions } })
            .then(res => {
                const areas = res.data;
                this.setState({ areas });
            })
    }


    render() {

        console.log(this.Auth.isAdmin());

        if (this.Auth.isAdmin()) {
            const listaTecnologia = this.state.tecno.map((tecnologia) =>
                <option value={tecnologia.tecnologiaId}>{tecnologia.nombreTecnologia}</option>
            );


            const listaAreaTecno = this.state.areaTecno.map((area) =>
                <option value={area.areaID}>{area.nombreArea}</option>
            );

            var result = this.state.areas.filter(elem => elem.areaID === this.state.AreaIDModificar)

            const listaAreaConLosDatosCargados = result.map((area) =>
                <option value={area.tecnologiaFk}>{area.tecnologiaFk}</option>
            );



            const listaEstados = this.state.estados;

            const listaEstado = listaEstados.map((estado) =>
                <option value={estado.id}>{estado.estado}</option>
            );

            this.recargar();

            return (
                <div>
                    <Navigation />
                    <div className="container">
                        <div className="row ">
                            <div className="col mt-4 ">
                                <br /><br />
                                <div>
                                    <div className="form-row">
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" id="myInput" placeholder="Buscar" />
                                        </div>

                                        <div className="col-md-6 mb-3 pagination justify-content-end">
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
                                                        <div className="form-group">
                                                            <label id="txtModal">Seleccione la tecnología</label>
                                                            <select className="form-control container" id="exampleFormControlSelect1" name="selectGeneric" onChange={this.cargarAreas} >
                                                                <option disabled selected="selected">Tecnología</option>
                                                                {listaTecnologia}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label id="txtModal">Seleccione el área principal</label>
                                                            <select className="form-control container" id="exampleFormControlSelect1" name="selectArea" onChange={this.handleChange}>
                                                                <option disabled selected="selected">Área</option>
                                                                <option value="0">Ninguna</option>
                                                                {listaAreaTecno}
                                                            </select>
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
                                                        <Button id="close" className="btnBlue" data-dismiss="modal" onClick={this.handleSubmit}>Agregar</Button>
                                                    </Modal.Footer>
                                                </Modal.Dialog>
                                            </div>
                                            <button data-toggle="modal" href="#myModal" className="btn btnGrey"><AddIcon />  Agregar </button>
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
                                        <th className="size" scope="col">Nombre</th>
                                        <th className="size" scope="col">Área principal</th>
                                        <th className="size" scope="col">Tecnología</th>
                                        <th className="size" scope="col">Estado</th>
                                        <th className="size" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    {this.state.areas.map(elemento => {
                                        return (
                                            <tr key={elemento.areaID}>
                                                <td>{elemento.areaID} </td>
                                                <td> {elemento.nombreArea}</td>
                                                <td> {elemento.areaFk}</td>
                                                <td> {elemento.tecnologiaFk} </td>
                                                <td>{elemento.estado} </td>
                                                <td>
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
                                <Modal.Title id="titleModal">Modificación de área</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <label>Nombre del área</label>
                                    <FormControl className="form-control" name="NombreAreaModificar" value={this.state.NombreAreaModificar} onChange={this.handleChange} placeholder="Nombre del area"></FormControl>
                                </div>
                                <div className="form-group">
                                    <label>Seleccione la tecnología</label>
                                    <select className="form-control container" id="exampleFormControlSelect1" name="SelectAreaTecnologiaModificar" onChange={this.cargarAreas}>
                                        <option disabled selected="selected">{this.state.SelectAreaTecnologiaModificar}</option>
                                        {listaTecnologia}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Seleccione el área principal</label>
                                    <select className="form-control container" id="exampleFormControlSelect1" name="SelectAreaPrincipalModificar" onClick={this.handleChange}>
                                        <option disabled selected="selected">{this.state.SelectAreaPrincipalModificar}</option>
                                        {listaAreaTecno}
                                    </select>
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
                                <Button id="close" className="btnBlue" data-dismiss="modal" onClick={() => this.ModificarArea()}>Aceptar</Button>
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
} export default AdminArea;