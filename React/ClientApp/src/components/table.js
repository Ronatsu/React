import React, { Component } from 'react';
import { incidents } from './bd/incident.json';
import SearchkIcon from '@material-ui/icons/Search';
import $ from 'jquery';

class IncidentTable extends Component {
  constructor(props) {
    super();
    this.state = {
      incidents
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

  render() {
    const incidentCard = this.state.incidents.map((incident) => {
      return (
        <tr>
          <td><button class="btn btn-primary btn-md  " type="submit" ><SearchkIcon />Dar Seguimiento</button></td>
          <th scope="row">{incident.impactLevel}</th>
          <td>{incident.impactFeasibility}</td>
          <td>{incident.description}</td>
          <td>{incident.date}</td>
        </tr>

      )
    })

    return (
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
    );
  }
}

export default IncidentTable;
