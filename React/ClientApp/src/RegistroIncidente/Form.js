import React from 'react';
import { Link } from "react-router-dom";
import 'react-day-picker/lib/style.css';
import Navigation from '../components/Navigation';
import '../components/ButtonColor.css';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super();
        super(props);
        this.state = {
            tipoIncidencia: '',
            tipoImpacto: '',
            areaAfectada: '',
            tencologia: '',
            gradoControl: '',
            descripcion: '',
            fecha: '',
            metodoDeteccion: '',
            probabilidad: '',
            TECNO: [],
            IMPACTO: [],
            ProbablidadImpacto: [],
            TIPO_INCIDENCIA: [],
            AREA_AFECTADA: [],
            GRADO_CONTROL: [],
            metodoDeteccionList: []
        };
    }

    cargarAreas = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
        if (valueInput != 0 && valueInput != "Tecnología") {
            axios.post(`http://localhost:44372/api/AdministracionAreaTecnologia/ObtenerAreaTecno`, {
                TecnologiaId: valueInput
            }).then(res => {
                const AREA_AFECTADA = res.data;
                this.setState({ AREA_AFECTADA });
            })
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:44372/api/AdministracionAreaTecnologia/GetTecnologiaHabilitado`)
            .then(res => {
                const TECNO = res.data;
                this.setState({ TECNO });
            })

        axios.get(`http://localhost:44372/api/MetodoDeteccion/VerMetodos`)
            .then(res => {
                const metodoDeteccionList = res.data;
                this.setState({ metodoDeteccionList });
            })


        axios.get(`http://localhost:44372/api/ImpactoIncidencia/ImpactoIncidencia`)
            .then(res => {
                const IMPACTO = res.data;
                this.setState({ IMPACTO });
            })

        axios.get(`http://localhost:44372/api/ImpactoIncidencia/ProbabilidadImpacto`)
            .then(res => {
                const ProbablidadImpacto = res.data;
                this.setState({ ProbablidadImpacto });
            })

        axios.get(`http://localhost:44372/api/TipoIncidencia/GetTipos`)
            .then(res => {
                const TIPO_INCIDENCIA = res.data;
                this.setState({ TIPO_INCIDENCIA });
            })

        axios.get(`http://localhost:44372/api/GradoControl`)
            .then(res => {
                const GRADO_CONTROL = res.data;
                this.setState({ GRADO_CONTROL });
            })
    }

    handleChange = event => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({
            [nameInput]: valueInput
        });
    }

    handleSubmit = event => {
        if (this.state.tipoImpacto === "") {
            alert("Seleccione el nivel de impacto");
            event.preventDefault();
        } else if (this.state.probabilidad === "") {
            event.preventDefault();
            alert("Seleccione la probabilidad de impacto");
        } else if (this.state.tencologia === "") {
            event.preventDefault();
            alert("Seleccione la tecnología afectada");
        } else if (this.state.areaAfectada === "") {
            event.preventDefault();
            alert("Seleccione la área afectada");
        } else if (this.state.tipoIncidencia === "") {
            event.preventDefault();
            alert("Seleccione el tipo de incidencia");
        } else if (this.state.gradoControl === "") {
            event.preventDefault();
            alert("Seleccione el grado de control");
        } else if (this.state.gradoControl === "") {
            event.preventDefault();
            alert("Seleccione el grado de control");
        } else if (this.state.metodoDeteccion === "") {
            event.preventDefault();
            alert("Seleccione el métado de detección");
        } else if (this.state.descripcion === "") {
            event.preventDefault();
            alert("Ingrese la descripción");
        } else {
            axios.post(`http://localhost:44372/api/Incidencia/AddIncident`, {
                tipoIncidencia: this.state.tipoIncidencia
                , tipoImpacto: this.state.tipoImpacto
                , probabilidaImpacto: this.state.probabilidad
                , gradoControl: this.state.gradoControl
                , tencologia: this.state.tencologia
                , areaAfectada: this.state.areaAfectada
                , descripcion: this.state.descripcion
                , fechaDescubrimiento: this.state.fecha
                , metodoDeteccion: this.state.metodoDeteccion
            })
        }
    }

    render() {

        const metodoDetec = this.state.metodoDeteccionList;

        const metodoDeteccList = metodoDetec.map((metodo) =>
            <option value={metodo.id}>{metodo.metodoDeteccionNombre}</option>
        );

        const tIncidencias = this.state.TIPO_INCIDENCIA;

        const listaIncidencias = tIncidencias.map((incidencia) =>
            <option value={incidencia.id}>{incidencia.descripcion}</option>
        );

        const impIncidencias = this.state.IMPACTO;

        const listaImpacto = impIncidencias.map((impacto) =>
            <option value={impacto.id}>{impacto.descripcion}</option>
        );

        const listaProbabilidad = this.state.ProbablidadImpacto.map((probabilidad) =>
            <option value={probabilidad.id}>{probabilidad.descripcion}</option>
        );

        const areaIncidencias = this.state.AREA_AFECTADA;
        const listaAreas = areaIncidencias.map((area) =>
            <option value={area.areaID}>{area.nombreArea}</option>
        );

        const tecAfectada = this.state.TECNO;
        const listaTecno = tecAfectada.map((tecnologia) =>
            <option value={tecnologia.tecnologiaId}>{tecnologia.nombreTecnologia}</option>
        );

        const gradoControl = this.state.GRADO_CONTROL;
        const listaControl = gradoControl.map((control) =>
            <option value={control.id}>{control.descrpcion}</option>
        );
        return (
            <div className="container">
                <Navigation />
                <form className="container" >
                    <header className="App-header">
                        <br /><br /><br />
                        <h3 className="mt-4">Insertar Incidencia</h3>
                    </header>
                    <div>
                        <div className="row">
                            <br /><br /><br />       <br /><br /><br />
                            <div className="col-xs-4 col-md-4" >
                                <div className="form-group">
                                    <label>Impacto *</label>
                                    <select className="form-control" name="tipoImpacto" onClick={this.handleChange} value={listaImpacto.descripcion}>
                                        <option disabled selected="selected">Impacto</option>
                                        {listaImpacto}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Área *</label>
                                    <select className="form-control" name="areaAfectada" onClick={this.handleChange} value={listaAreas.nombreArea}>
                                        <option disabled selected="selected">Área afeactada</option>
                                        {listaAreas}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Método de detección *</label>
                                    <select className="form-control" id="lang4" name="metodoDeteccion" onClick={this.handleChange}>
                                        <option disabled selected="selected">Método de detección</option>
                                        {metodoDeteccList}
                                    </select>
                                </div>
                            </div>

                            <div className="col-xs-4 col-md-4">
                                <div className="form-group">
                                    <label>Probablididad de impacto *</label>
                                    <select className="form-control" name="probabilidad" onClick={this.handleChange} >
                                        <option disabled selected="selected">Probabilidad de impacto</option>
                                        {listaProbabilidad}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Tipo *</label>
                                    <select className="form-control" name="tipoIncidencia" onClick={this.handleChange}>
                                        <option disabled selected="selected">Tipo de incidencia</option>
                                        {listaIncidencias}
                                    </select>
                                </div>

                                <div className="form-group">

                                    <label>Fecha de descubrimiento *</label>
                                    <input className="form-control" name="fecha" onChange={this.handleChange} type="datetime-local" id="example-date-input" />
                                </div>
                            </div>


                            <div className="col-xs-4 col-md-4">
                                <div className="form-group">
                                    <label>Tecnología afectada *</label>
                                    <select className="form-control" name="tencologia" onChange={this.cargarAreas} value={listaTecno.nombreTecnologia}>
                                        <option disabled selected="selected">Tecnología afectada</option>
                                        {listaTecno}
                                    </select>
                                </div>

                                <div className="form-group">

                                    <label>Grado de control *</label>
                                    <select className="form-control" name="gradoControl" onClick={this.handleChange} value={gradoControl.descrpcion}>
                                        <option disabled selected="selected">Grado de control</option>
                                        {listaControl}
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <div className="form-group blue-border-focus">
                                    <label >Inserte la descripción de la incidencia *</label>
                                    <textarea className="form-control" name="descripcion" onChange={this.handleChange} value={this.state.descripcion} id="exampleFormControlTextarea5" rows="3" maxLength='550'></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="pagination justify-content-end">
                            <button className="btn btnRed" type="submit">Cancelar</button>
                            <button className="btn btnBlue" type="submit" onClick={this.handleSubmit}>Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;