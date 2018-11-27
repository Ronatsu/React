import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import { incidents } from '../components/bd/incident.json';
import SearchkIcon from '@material-ui/icons/Search';
import $ from 'jquery';
import './Home.css';
import { Link } from "react-router-dom";


class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      incidents
    }

    super(props);

    $(document).ready(function () {
      $("#inputSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }
  render() {
    const incidentCard = this.state.incidents.map((incident) => {
      return (
        <tr>
          <td>  <Link to="/InformacionIncidencia"><button class="btn btn-primary btn-md  " type="submit" ><SearchkIcon />Dar Seguimiento</button></Link></td>
          <th scope="row">{incident.impactLevel}</th>
          <td>{incident.impactFeasibility}</td>
          <td>{incident.description}</td>
          <td>{incident.date}</td>
        </tr>

      )
    })
    return (
      <div >
        <Navigation />
        <div className="container">
          <br /><br /><br /><br />
          <div className="w-auto p-3">
            <input className="form-control " type="text" id="inputSearch" placeholder="Search"></input>
          </div>
          <div className="row ">
            <div className="col  ">
              <div className="container table-responsive " id="main_div">
                <table className="table table-hover table-condensed " id="table_id">
                  <thead>

                    <tr>
                      <th>
                      </th>
                      <th>Impacto
            </th>
                      <th >Probabilidad de Impacto
            </th>
                      <th >Descripción
            </th>
                      <th >Fecha de Incidencia
            </th>
                    </tr>
                  </thead>
                  <tbody id="myTable">

                    {incidentCard}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
