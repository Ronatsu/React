import React from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import EditIcon from '@material-ui/icons/Edit';
import '../components/ButtonColor.css';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'



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
        axios.post(`http://localhost:44372/api/User/ModificarUsuario`, {
            partyId: this.state.partyId,
            roL_USUARIO: this.state.rol,
            Estado: this.state.estado
        }).then(res => {
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
        axios.post(`http://localhost:44372/api/User/GetUsuarioPorId`, {
            partyId: id
        }).then(res => {
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
        axios.get(`http://localhost:44372/api/User/GetAllUsers`)
            .then(res => {
                var parties = res.data;
                this.setState({ parties });
            })
    }
    render() {
        this.getData();


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
    }
}
export default AdminUser;
