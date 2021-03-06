import React from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import EditIcon from '@material-ui/icons/Edit';
import '../components/ButtonColor.css';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';
import AuthService from '../components/AuthService';



class AdminUser extends React.Component {

    constructor(props) {
        super();
        this.state = {
            parties: []
            , estados: []
            , nombre: ""
            , estado: ""
            , estadoActual: ""
            , rol: ""
            , rolActual: ""
            , partyId: ""
        }
        this.Auth = new AuthService();


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

    ModificarUsuario() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/User/ModificarUsuario`, 
            {
                partyId: this.state.partyId,
                roL_USUARIO: this.state.rol,
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

    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        console.log("name " + nameInput)
        console.log("value " + valueInput)
        this.setState({
            [nameInput]: valueInput
        });
    }

    PartyModificar(id) {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.post(`https://localhost:44357/api/User/GetUsuarioPorId`,
            {
                partyId: id
            },
            {
                headers: { 'Authorization': headerOptions }
            }
        ).then(res => {
            const party = res.data;
            console.log(party)

            this.setState({
                partyId: id
                , estadoActual: party.estado
                , estado: party.estadoId
                , rolActual: party.roL_USUARIO
                , rol: party.rolId
                , nombre: party.nombre
            });



        })
    }

    getData() {

        if (this.Auth.loggedIn()) {
            var headerOptions = "Bearer " + this.Auth.getToken()

        }

        axios.get(`https://localhost:44357/api/User/GetAllUsers`, { headers: { "Authorization": headerOptions } })
            .then(res => {
                var parties = res.data;
                this.setState({ parties });
            })
    }
    render() {
        this.getData();


        if (this.Auth.isAdmin()) {
            return (
                <div className="container ">
                    <Navigation />

                    <br />
                    <br />


                    <div className="w-auto p-3 mt-4">
                        <input className="form-control" id="myInput" type="text" placeholder="Buscar"></input>
                    </div>
                    <div className=" container table-responsive " id="main_div">
                        <table className="table table-hover table-condensed " id="table_id">
                            <thead>
                                <tr>
                                    <th >Nombre</th>
                                    <th className="size" scope="col">Correo Electrónico</th>
                                    <th className="size" scope="col">Rol</th>
                                    <th className="size" scope="col">Estado</th>
                                    <th className="size" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {this.state.parties.map(elemento => {
                                    return (
                                        <tr key={elemento.partyid}>
                                            <td>{elemento.nombre} {elemento.primeR_APELLIDO} {elemento.segundO_APELLIDO}</td>
                                            <td>{elemento.correoElectronico}</td>
                                            <td>{elemento.roL_USUARIO}</td>
                                            <td>{elemento.estado}</td>
                                            <td><button type="submit" className="btn btnBlue" data-toggle="modal" href="#modal2" onClick={() => this.PartyModificar(elemento.partyid)}><EditIcon />Editar</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="container" id="modal2">
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title id="titleModal"> Editando {this.state.nombre}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <div className=" justify-content-end">
                                        <select className="form-control" id="exampleFormControlSelect1" name="rol" onChange={this.handleChange}>
                                            <option disabled selected>{this.state.rolActual}</option>
                                            <option value="2">Usuario</option>
                                            <option value="1" >Administrador</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label id="txtModal">Estado</label>
                                    <select className="form-control container" name="estado" onChange={this.handleChange}>
                                        <option disabled selected="selected">{this.state.estadoActual}</option>
                                        <option value="6">Habilitado</option>
                                        <option value="7">Deshabilitado</option>


                                    </select>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button id="close" className="btnRed" data-dismiss="modal">Cancelar</Button>
                                <Button id="close" className="btnBlue" data-dismiss="modal" onClick={() => this.ModificarUsuario()}>Aceptar</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>

                </div>
            );
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
export default AdminUser;
