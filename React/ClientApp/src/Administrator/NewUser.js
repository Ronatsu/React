import React, { Component } from 'react';
import $ from 'jquery';
import './Block_User.css';
import Navigation from '../components/Navigation';
//import { parties } from '../components/bd/party.json';
import BlockIcon from '@material-ui/icons/Block';
import AcceptUserIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import '../components/ButtonColor.css';

class newUser extends React.Component {

    constructor(props) {
        super();
        this.state = {
            parties:[],
            party: [],
            email: ""
            , partyId: ""
        }

        this.borrar = this.borrar.bind(this);

        super(props);

        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });

        //$(function () {
        //    $("#myTable tr td").click(function () {
        //       const cell = $(this).parents("tr").find("td").eq(3).text();//$(this).index(0).text();
        //        $("#show").attr("placeholder", cell).val("").focus().blur();
        //        /*const row = $(this).parents('tr').index();
        //        const contenido = $(this).html();
        //        $("#result").html('fila= ' + row + " columna= " + cell + " Contenido= " + contenido)*/
        //        //$("#show").css("display", "none");
        //        $("#show").html(cell);
        //    })
        //})


       
    }
  
    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
        this.handleChange = this.handleChange.bind(this);
        console.log(this.state.email);
    }

    componentWillMount() {
        axios.get(`http://localhost:58055/api/User/userList`)
          
            .then(res => {
                var parties = res.data;
                this.setState({ parties });
                console.log(parties);
            })
      
    }

    deshabilitar(cod) {
        axios.post(`http://localhost:58055/api/User/Deshabilitar`, {
            partyId: cod,
        })
    }  

    aceptar(cod) {
        axios.post(`http://localhost:58055/api/User/Habilitar`, {
            partyId: cod,
        })
    }



    handleSubmitH = event => {
        event.preventDefault();
        axios.post(`http://localhost:58055/api/User`, {
            emial: this.state.email
           
        })
        console.log(this.state.email)
    }

    handleSubmitD = event => {
        event.preventDefault();

        axios.post(`http://localhost:58055/api/User/Deshabilitar`, {
            emial: this.state.email
        })

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
                <tr key={party.partyid}>
                    <td scope="row">{party.nombre}</td>
                    <td>{party.primeR_APELLIDO}</td>
                    <td>{party.segundO_APELLIDO}</td>
                    <td name="emial">{party.correoElectronico}</td>
                    <td>{party.roL_USUARIO}</td>
                    <td><button class="btn btnGreen" type="submit" onClick={() => this.aceptar(party.partyid)}><AcceptUserIcon/>  Aceptar</button>
                        <button class="btn btnRed" type="submit" onClick={() => this.deshabilitar(party.partyid)} ><BlockIcon/>  Rechazar</button></td>
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
                <input className="form-control" id="myInput" type="text" placeholder="Buscar"></input>
                </div>
                <div className="container table-responsive " id="main_div">
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
                            {partiesTable}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default newUser;
