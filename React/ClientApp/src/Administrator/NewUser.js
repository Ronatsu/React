import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
import { parties } from '../components/bd/party.json';
import BlockIcon from '@material-ui/icons/Block';
import AcceptUserIcon from '@material-ui/icons/PersonAdd';

class newUser extends React.Component {

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



    /*constructor(props) {
      super(props);
      this.state = { forecasts: [], loading: true };
  
      fetch('api/SampleData/WeatherForecasts')
        .then(response => response.json())
        .then(data => {
          this.setState({ forecasts: data, loading: false });
        });
    }*/
    render() {
        const partiesTable = this.state.parties.map((party) => {
            return (
                <tr>
                    <th scope="row">{party.nombre}</th>
                    <td>{party.correo}</td>
                    <td>{party.area}</td>
                    <td><button class="btn btn-success  " type="submit"><AcceptUserIcon/>  Aceptar</button></td>
                    <td><button class="btn btn-danger  " type="submit"><BlockIcon/>  Rechazar</button></td>
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
                <div className="w-auto p-3">
                <input className="form-control" id="myInput" type="text" placeholder="Search.."></input>
                </div>
                <div className="container table-responsive " id="main_div">
                    <table className="table table-hover table-condensed " id="table_id">
                        <thead>
                            <tr>
                                <th className="size" scope="col">Nombre</th>
                                <th className="size" scope="col">Correo</th>
                                <th className="size" scope="col">Área</th>
                                <th className="size" scope="col"></th>
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
export default newUser;
