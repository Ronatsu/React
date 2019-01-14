import React from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import { parties } from '../components/bd/party.json';
import EditIcon from '@material-ui/icons/Edit';
import '../components/ButtonColor.css';
import axios from 'axios';
import { Button, Modal, FormControl } from 'react-bootstrap'



class navigatiom extends React.Component {

    constructor(props) {
        super();
        this.state = {
            parties
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
    getData() {
        axios.get(`http://localhost:44372/api/User/GetAllUsers`)

            .then(res => {
                var parties = res.data;
                this.setState({ parties: parties });
            })
    }
    render() {
        this.getData();
        //const partiesTable = {
        //    this.state.parties.map(elemento => {
        //        return (
        //            <tr>
        //                <tr key={elemento.partyid}>
        //                    <td scope="row">{elemento.nombre}</td>
        //                    <td>{elemento.primeR_APELLIDO}</td>
        //                    <td>{elemento.segundO_APELLIDO}</td>
        //                    <td name="emial">{elemento.correoElectronico}</td>
        //                    <td>{elemento.roL_USUARIO}</td>
        //                    <td><button className={showStatusBlock(party.block)} type="submit"><BlockIcon />{showTextStatusBlock(party.block)}</button></td>
        //                </tr>

        //                )
        //            })
        //                        }}
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
                                <th className="size" scope="col">Nombre</th>
                                <th className="size" scope="col">Primer Apellido</th>
                                <th className="size" scope="col">Segundo Apellido</th>
                                <th className="size" scope="col">Correo Electrónico</th>
                                <th className="size" scope="col">Rol</th>
                                <th className="size" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="myTable">
                            {this.state.parties.map(elemento => {
                                return (
                                    <tr key={elemento.partyid}>
                                        <td scope="row">{elemento.nombre}</td>
                                        <td>{elemento.primeR_APELLIDO}</td>
                                        <td>{elemento.segundO_APELLIDO}</td>
                                        <td name="emial">{elemento.correoElectronico}</td>
                                        <td>{elemento.roL_USUARIO}</td>
                                        <td><button type="submit" className="btn btnBlue" data-toggle="modal" href="#modal2"><EditIcon />Editar</button></td>
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
                                
                            </select>
                            <br />
                            <label>Rol</label>
                            <div className=" justify-content-end">
                                <select className="form-control" id="exampleFormControlSelect1" name="criticoS_N_Modificar" onChange={this.handleChange}>
                                    <option disabled selected>{this.state.criticoS_N_Modificar}</option>
                                    <option value="2">Usuario</option>
                                    <option value="1" >Administrador</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label id="txtModal">Estado</label>
                                <select className="form-control container" name="estado" onChange={this.handleChange}>
                                    <option disabled selected="selected">{this.state.estadoActual}</option>

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
        );
    }
}
export default navigatiom;

function showStatusBlock(status) {
    if (status === true) {
        $("#textButton").html("Desbloquear");
        return "btn btnGreen"
    } else if (status === false) {
        $("#textButton").html("Bloquear");
        return "btn btnRed"
    }
}
function showTextStatusBlock(status) {
    if (status === true) {
        return "Desbloquear"
    } else if (status === false) {
        return "Bloquear"
    }
}
