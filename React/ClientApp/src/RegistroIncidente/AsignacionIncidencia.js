import React from 'react';
import Navigation from '../components/Navigation';
import { colaboradores } from '../components/bd/colaborador.json';
import '../Administrator/Block_User.css';


class AsignacionIncidencia extends React.Component {
  constructor(props) {
    super();
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
                <button class="btn btn-light  " type="submit">Cancelar</button>
                <button class="btn btn-primary" type="submit">Notificar</button>
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

      <div className="container">
        <div className="row">
          <div className="col">
            <div className=" container " id="main_div">
              <table className="table table-hover table-condensed " id="table_id">
              <thead >
                  <tr >
                    <th>Asignar
            </th>
                    <th>Area Especializacion
            </th>
                    <th >Primer Nombre
            </th>
                    <th >Primer Apellido
            </th>
                    <th >Correo Electronico
            </th>
                  </tr>
                </thead>
                <tbody>
                  {colaboradorCard}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
            <label for="exampleFormControl">Filtrar Incidencia</label>
            <br></br>
            <div className="form-row">
              <label class="checkbox-inline"> <input type="checkbox" value="" /> Bases de Datos&nbsp;&nbsp;</label>
              <label class="checkbox-inline"> <input type="checkbox" value="" /> Redes&nbsp;&nbsp;</label>
              <label class="checkbox-inline"> <input type="checkbox" value="" /> Desarrollo&nbsp;&nbsp;</label>
              <label class="checkbox-inline"> <input type="checkbox" value="" /> Infraestructura&nbsp;&nbsp;</label>
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
              <p>Se presento una incidencia en el area de base de datos, en el servidor externo de la empresa, se debe recurrir a restablecer todos los dominios, para entrar nuevamente al trabajo normal.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AsignacionIncidencia;