import React from 'react';
import Navigation from '../components/Navigation';
import { colaboradores } from '../components/bd/colaborador.json';
import '../Administrator/Block_User.css';
import $ from 'jquery';

class AsignacionIncidencia extends React.Component {
    constructor(props) {
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
                                <button class="btn btnBlue" type="submit">Notificar</button>
                            </div>
                        </div>
                    </fieldset>
                </form>

            </div>
        )
    }
}

class ColaboradorTabla extends React.Component {
    constructor() {
        super();
        this.state = {
            colaboradores
        }
    }

    render() {
        const colaboradorCard = this.state.colaboradores.map((colaborador) => {
            return (
                <tr>
                    <td><input type="checkbox" value="" /></td>
                    <th scope="row">{colaborador.area}</th>
                    <td>{colaborador.primernombre}</td>
                    <td>{colaborador.primerapellido}</td>
                    <td>{colaborador.correo}</td>
                </tr>

            )
        })

        return (
            <div className="container table-responsive " id="main_div">
                <table className="table table-hover table-condensed " id="table_id">
                    <thead>
                        <tr>
                            <th className="size" scope="col">Asignar</th>
                            <th className="size" scope="col">Area Especializacion</th>
                            <th className="size" scope="col">Primer Nombre</th>
                            <th className="size" scope="col">Primer Apellido</th>
                            <th className="size" scope="col">Correo Electronico</th>

                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {colaboradorCard}

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
                <div className="Container-div">
                    <div >
                        <blockquote>
                            <p>Se presento una incidencia en el área de base de datos, en el servidor externo de la empresa, se debe recurrir a restablecer todos los dominios, para entrar nuevamente al trabajo normal.</p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AsignacionIncidencia;