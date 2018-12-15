import React from 'react';
import Navigation from '../components/Navigation';
//import { parties } from '../components/bd/colaborador.json';
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
            , partyId: ""
             ,checkboxes: {
                c1: false,
                c2: false,
                c3: false,
                selected: null,
            }
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

        this.setState({ asignacionArray: [this.state.asignacionArray+-1] });
        console.log(this.state.asignacionArray)
    }
        onCheck(name, val) {
            const checkboxes = Object.assign({}, this.state.checkboxes, {});
            for (let key in checkboxes) {
                checkboxes[key] = false;
            }
            checkboxes[name] = true;
            checkboxes.selected = val;
            this.setState({ checkboxes });
            console.log(this.state.checkboxes)
        }
        //axios.post(`http://localhost:58055/api/Incidencia`, {
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
        return (
            <div className="container-fluid">
                <Navigation />
                <form className="container" >

                    <fieldset className="fields">
                        <header className="App-header">
                            <br /><br /><br />
                            <h3 className="mt-4"><b>Asignar Incidencia</b></h3>
                        </header>
                        <div>
                            {ShowIncident()}
                            {FilterUser()}
                            <ColaboradorTabla />
                            <div class="pagination justify-content-end">
                                <button class="btn btnRed  " type="submit">Cancelar</button>
                                <button class="btn btnBlue" type="submit" onClick={this.handleSubmit}>Notificar</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <br /> <br /> <br />
            </div>
        )
    }
}

class ColaboradorTabla extends React.Component {
    constructor() {
        super();
        this.state = {
            parties: [],
            party: [],
            partyId: ""
        }
    }
    componentWillMount() {
        axios.get(`http://localhost:58055/api/User/UsuarioHabilitado`)

            .then(res => {
                var parties = res.data;
                this.setState({ parties });
                console.log(parties);
            })

    }
    render() {
        const partiesTable = this.state.parties.map((party) => {
            return (
                <tr key={party.partyid}>
                    <td><input type="checkbox" value=""/></td>
                    <td>{party.nombre}</td>
                    <td>{party.primeR_APELLIDO}</td>
                    <td>{party.segundO_APELLIDO}</td>
                    <td >{party.correoElectronico}</td>
                    <td>{party.roL_USUARIO}</td>
                   
                </tr>

            )
        })

        return (
            <div className="container table-responsive " id="main_div">
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
            </div>


        );
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
                            <p className="card-text">Se presento una incidencia en el área de base de datos, en el servidor externo de la empresa, se debe recurrir a restablecer todos los dominios, para entrar nuevamente al trabajo normal.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AsignacionIncidencia;