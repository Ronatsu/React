import React from 'react';
import Navigation from '../components/Navigation';
import { Link } from "react-router-dom";
import '../Administrator/Block_User.css';
import $ from 'jquery';
import axios from 'axios';

class AsignacionIncidencia extends React.Component {
    constructor(props) {
        super();
        this.state = {
            parties: [],
            party: [],
            asignacionArray: []
            , partyId: "",
            itemChecked: []


        }
        super(props);



        $(document).ready(function () {

            $('#divCheck input').click(function () {
                $(".ckeck").on('change', function () {

                    const labelText = $.trim($(".inputCheck" + $(this).attr('id')).text().toLowerCase());
                    if (labelText != "todos") {
                        if ($(this).is(':checked')) {

                            $("#myTable tr").filter(function () {
                                $(this).toggle($(this).text().toLowerCase().trim().indexOf(labelText) > -1)
                            });
                        }
                    } else {

                        $("#myTable tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf("") > -1)
                        });
                    }
                });
            })
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:44372/api/Incidencia/AsignarIncident`, {
            asignacionArray: this.state.asignacionArray
        })

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        axios.get(`http://localhost:44372/api/User/UsuarioHabilitado`)

            .then(res => {
                var parties = res.data;
                this.setState({ parties });
                console.log(parties);
            })
    }

    checkItem(partyid, e) {
        var usuario = new Object();
        usuario.partyid = partyid;
        usuario.add = e.target.checked;

        if (this.state.asignacionArray.length == 0) {
            this.state.asignacionArray.push(usuario);

        } else {

            var existe = false
            for (var item = 0; item < this.state.asignacionArray.length; item++) {
                if (this.state.asignacionArray[item].partyid === usuario.partyid) {
                    this.state.asignacionArray[item] = usuario;
                    existe = true
                }
            }
            if (!existe) {
                this.state.asignacionArray.push(usuario);

            }
        }
        //this.setState({ itemChecked });
        console.log(this.state.asignacionArray);
    }



    //axios.post(`https://localhost:44372/api/Incidencia`, {
    //    tipoIncidencia: this.state.tipoIncidencia
    //    , tipoImpacto: this.state.tipoImpacto
    //    , gradoControl: this.state.gradoControl
    //    , tencologia: this.state.tencologia
    //    , areaAfectada: this.state.areaAfectada
    //    , descripcion: this.state.descripcion
    //    , fechaDescubrimiento: this.state.fecha
    //    , metodoDeteccion: this.state.metodoDeteccion
    //})


    render() {

        const partiesTable = this.state.parties.map((party) => {
            return (
                <tr key={party.partyid}>
                    <td><input type="checkbox" onChange={(e) => this.checkItem(party.partyid, e)} /></td>
                    <td>{party.nombre}</td>
                    <td>{party.primeR_APELLIDO}</td>
                    <td>{party.segundO_APELLIDO}</td>
                    <td >{party.correoElectronico}</td>
                    <td>{party.roL_USUARIO}</td>

                </tr>
            )
        })
        return (
            <div className="container-fluid">
                <Navigation />
                <form className="container" >

                    <fieldset className="fields">
                        <header className="App-header">
                            <br /><br /><br />
                            <h3 className="mt-4"><b>Asignar Incidencia</b></h3>
                        </header>

                        <div className="card" id="card">
                            <div class="card-body">
                                <p className="card-text">
                                    Se presento una incidencia en el área de base de datos, en el servidor externo de la empresa, se debe recurrir a restablecer todos los dominios, para entrar nuevamente al trabajo normal.
                                    </p>
                            </div>
                        </div>
                        <br />

                        <table className="table table-hover table-condensed " id="table_id">
                            <thead>
                                <tr>
                                    <th className="size" scope="col"></th>
                                    <th className="size" scope="col">Nombre</th>
                                    <th className="size" scope="col">Primer Apellido</th>
                                    <th className="size" scope="col">Segundo Apellido</th>
                                    <th className="size" scope="col">Correo Electronico</th>
                                    <th className="size" scope="col">Rol</th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {partiesTable}
                            </tbody>
                        </table>

                        <div class="pagination justify-content-end">
                            <Link to="/SinAsignar">  <button class="btn btnRed  " type="submit">Cancelar</button></Link>
                            <button class="btn btnBlue" type="submit" onClick={this.handleSubmit}>Notificar</button>
                        </div>

                    </fieldset>
                </form>
                <br /> <br /> <br />
            </div>
        )
    }
}



function FilterUser() {
    return (
        <div className="container">
            <div className="row">
                <div className="Container-div">
                    <div >
                        <label for="exampleFormControl">Filtrar áreas</label>
                        <br></br>
                        <div className="form-row" id="divCheck">

                            <label className="checkbox-inline inputCheck0"> <input className="ckeck" type="radio" name="btnRadio" />Todos&nbsp;&nbsp;</label>
                            <label className="checkbox-inline inputCheck1"> <input className="ckeck" type="radio" name="btnRadio" id="1" />Bases de Datos&nbsp;&nbsp;</label>
                            <label className="checkbox-inline inputCheck2"> <input className="ckeck" type="radio" name="btnRadio" id="2" />Redes&nbsp;&nbsp;</label>
                            <label className="checkbox-inline inputCheck3"> <input className="ckeck" type="radio" name="btnRadio" id="3" />Desarrollador&nbsp;&nbsp;</label>
                            <label className="checkbox-inline inputCheck4"> <input className="ckeck" type="radio" name="btnRadio" id="4" />Infraestructura&nbsp;&nbsp;</label>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShowIncident() {
    return (
        <div className="container">
            <div className="row">
                <div className="div-container">
                    <div className="card" id="card">
                        <div class="card-body">
                            <p className="card-text">
                                Se presento una incidencia en el área de base de datos, en el servidor externo de la empresa, se debe recurrir a restablecer todos los dominios, para entrar nuevamente al trabajo normal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AsignacionIncidencia;