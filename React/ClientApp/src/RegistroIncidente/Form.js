import React from 'react';
import { Link } from "react-router-dom";
import 'react-day-picker/lib/style.css';
import Navigation from '../components/Navigation';


class Form extends React.Component {
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
              <h3 className="mt-4">Insertar Incidencia</h3>
            </header>
            <div>
              <Select />
              {MyTextArea()}
              <div class="pagination justify-content-end">
                <button class="btn btn-light  " type="submit">Cancelar</button>
                <Link to="/AsignacionIncidencia"><button className="btn btn-primary">Asignar</button></Link>
              </div>
            </div>
          </fieldset>
        </form>

      </div>
    )
  }
}

class Select extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tech: 'Incidencia',
      tech2: 'Impacto',
      tech3: 'Area',
      tech4: 'Tecnologia Afectada',
      tech5: 'Grado Control'
    };
  }

  handleChange(e) {
    this.setState({
      tech: e.target.value
    })
  }

  handleChange2(e) {
    this.setState({
      tech2: e.target.value
    })
  }

  handleChange3(e) {
    this.setState({
      tech3: e.target.value
    })
  }

  handleChange4(e) {
    this.setState({
      tech4: e.target.value
    })
  }

  handleChange5(e) {
    this.setState({
      tech5: e.target.value
    })
  }



  render() {

    const tIncidencias = ["Desactualizacion de software", "Infiltracion de la red", "Inyeccion de codigo", "Perdida de archivos"];

    const listaIncidencias = tIncidencias.map((incidencia) =>
      <option value={incidencia}>{incidencia}</option>
    );

    const impIncidencias = ["Grave", "Medio", "Bajo", "Sin Impacto"];

    const listaImpacto = impIncidencias.map((impacto) =>
      <option value={impacto}>{impacto}</option>
    );

    const areaIncidencias = ["Cloud", "Area Desarrollo", "Servidores Externos", "Centro De Redes"];

    const listaAreas = areaIncidencias.map((area) =>
      <option value={area}>{area}</option>
    );

    const tecAfectada = ["Router Cisco", "Gestor BD", "Servidor A-97r", "Azure"];

    const listaTecno = tecAfectada.map((tecnologia) =>
      <option value={tecnologia}>{tecnologia}</option>
    );

    const gradoControl = ["Control interno", "Asesoria", "Outsorcing", "Ente Estatal"];

    const listaControl = gradoControl.map((control) =>
      <option value={control}>{control}</option>
    );

    return (

      <div className="container mt-">

        <div className="row">
          <br /><br /><br />       <br /><br /><br />
          <div className="col-xs-4 col-md-4">

            <div className="Container-div">

              <label>Impacto incidencia *</label>
              <select className="form-control" id="lang2" onChange={this.handleChange2.bind(this)} value={this.state.tech2}>
                {listaImpacto}
              </select>
              

              <br></br>

              <label>Tecnología afectada *</label>
              <select className="form-control" disabled="false" id="lang4" onChange={this.handleChange4.bind(this)} value={this.state.tech4}>
                {listaTecno}
              </select>
             

            </div>

          </div>

          <div className="col-xs-4 col-md-4">

            <div className="Container-div">

              <label>Tipo incidencia *</label>
              <select className="form-control" id="lang" onChange={this.handleChange.bind(this)} value={this.state.tech}>
                {listaIncidencias}
              </select>
              

              <br></br>

              <label>Fecha de descubrimiento *</label>
              {MyDatePicker()}

            </div>

          </div>

          <div className="col-xs-4 col-md-4">

            <div className="Container-div">

              <label>Área incidencia *</label>
              <select className="form-control" id="lang3" onChange={this.handleChange3.bind(this)} value={this.state.tech3}>
                {listaAreas}
              </select>
            

              <br></br>

              <label>Grado de control *</label>
              <select className="form-control" id="lang5" onChange={this.handleChange5.bind(this)} value={this.state.tech5}>
                {listaControl}
              </select>
             

            </div>

          </div>

        </div>

      </div>

    )
  }
}

function MyDatePicker() {
  return (
    <input className="form-control" type="datetime-local" id="example-date-input" />
  );
}

function MyTextArea() {
  return (

    <div className="container">

      <div className="row">

        <div className="col-xs-12 col-md-12">

          <div className="Container-div">

            <div className="form-group blue-border-focus">
            <br></br>
            <br></br>
              <label for="exampleFormControlTextarea5">Inserte la descripción de la incidencia</label>
              <textarea className="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
            </div>

          </div>

        </div>

      </div>

    </div>


  );
}

export default Form;