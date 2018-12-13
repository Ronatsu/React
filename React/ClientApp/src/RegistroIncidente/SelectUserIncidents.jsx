import React, { Component } from 'react';
import $ from 'jquery';
import '../Administrator/Block_User.css';
import Navigation from '../components/Navigation';
import { parties } from '../components/bd/party.json';
import Search from '@material-ui/icons/Search';
import '../components/ButtonColor.css';

class SelectUserIncident extends React.Component {

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

        $(function () {
            $("#myTable tr td").click(function () {
                const cell = $(this).parents("tr").find("td").eq(0).text();//$(this).index(0).text();
                /*const row = $(this).parents('tr').index();
                const contenido = $(this).html();
                $("#result").html('fila= ' + row + " columna= " + cell + " Contenido= " + contenido)*/
                $("#show").html("Editando " + cell);

            })
        })
    }
    render() {
        const partiesTable = this.state.parties.map((party) => {
            return (
                <tr>
                    <th scope="row">{party.nombre}</th>
                    <td>{party.correo}</td>
                    <td>{party.area}</td>
                    <td><button class="btn btnBlue  " type="submit"><Search/> Ver Incidencias</button></td>
                </tr>

            )
        })

        return (
            <div className="container ">
                <Navigation />

                <br />
                <br />
                <br />
                <br />
                <div id="show"></div>
                <div className="w-auto p-3">
                <input className="form-control" id="myInput" type="text" placeholder="Buscar"></input>
                </div>
                <div className="container table-responsive " id="main_div">
                    <table className="table table-hover table-condensed " id="table_id">
                        <thead>
                            <tr>
                                <th className="size" scope="col">Nombre</th>
                                <th className="size" scope="col">Correo</th>
                                <th className="size" scope="col">Área</th>
                                <th className="size" scope="col"></th>
                               
                            </tr>
                        </thead>
                        <tbody id="myTable">
                            {partiesTable}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default SelectUserIncident;
