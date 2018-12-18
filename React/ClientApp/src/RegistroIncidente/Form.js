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
            TECNO: [],
            IMPACTO: [],
            TIPO_INCIDENCIA: [],
            AREA_AFECTADA: [],
            GRADO_CONTROL: [],
            metodoDeteccionList: []
        };
    }

    componentWillMount() {
        axios.get(`http://localhost:58055/api/Tecnologias`)
            .then(res => {
                const TECNO = res.data;
                this.setState({ TECNO });
            })

        axios.get(`http://localhost:58055/api/MetodoDeteccion/VerMetodos`)
            .then(res => {
                const metodoDeteccionList = res.data;
                this.setState({ metodoDeteccionList });
                console.log(this.state.metodoDeteccionList)
            })
    

        axios.get(`http://localhost:58055/api/ImpactoIncidencia`)
            .then(res => {
                const IMPACTO = res.data;
                this.setState({ IMPACTO });
            })

        axios.get(`http://localhost:58055/api/TipoIncidencia`)
            .then(res => {
                const TIPO_INCIDENCIA = res.data;
                this.setState({ TIPO_INCIDENCIA });
            })


        axios.get(`http://localhost:58055/api/AreaAfectada`)
            .then(res => {
                const AREA_AFECTADA = res.data;
                this.setState({ AREA_AFECTADA });
            })

        axios.get(`http://localhost:58055/api/GradoControl`)
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
        event.preventDefault();
        axios.post(`https://localhost:58055/api/Incidencia`, {
            tipoIncidencia: this.state.tipoIncidencia
            , tipoImpacto: this.state.tipoImpacto
            , gradoControl: this.state.gradoControl
            , tencologia: this.state.tencologia
            , areaAfectada: this.state.areaAfectada
            , descripcion: this.state.descripcion
            , fechaDescubrimiento: this.state.fecha
            , metodoDeteccion: this.state.metodoDeteccion
        })

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
                                <label>Impacto *</label>
                                <select className="form-control" name="tipoImpacto" id="lang2" onClick={this.handleChange} value={listaImpacto.descripcion}>
                                    {listaImpacto}
                                </select>

                                <br></br>

                                <label>Tecnología afectada *</label>
                                <select className="form-control" id="lang4" name="tencologia" onClick={this.handleChange} value={listaTecno.nombreTecnologia}>
                                    {listaTecno}
                                </select>

                                <br></br>

                                <label>Método de detección *</label>
                                <select className="form-control" id="lang4" name="metodoDeteccion" onClick={this.handleChange} value={metodoDeteccList.metodoDeteccionNombre}>
                                    {metodoDeteccList}
                                </select>
                            </div>

                            <div className="col-xs-4 col-md-4">
                                <label>Tipo *</label>
                                <select className="form-control" id="lang" name="tipoIncidencia" onClick={this.handleChange} value={listaIncidencias.descripcion}>
                                    {listaIncidencias}
                                </select>
                                <br></br>
                                <label>Fecha de descubrimiento *</label>
                                <input className="form-control" name="fecha" onChange={this.handleChange} type="datetime-local" id="example-date-input" />
                            </div>


                            <div className="col-xs-4 col-md-4">
                                <label>Área *</label>
                                <select className="form-control" id="lang3" name="areaAfectada" onClick={this.handleChange} value={listaAreas.nombreArea}>
                                    {listaAreas}
                                </select>
                                <br></br>
                                <label>Grado de control *</label>
                                <select className="form-control" id="lang5" name="gradoControl" onClick={this.handleChange} value={gradoControl.descrpcion}>
                                    {listaControl}
                                </select>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <div>
                                    <div className="form-group blue-border-focus">
                                        <br></br>
                                        <br></br>
                                        <label for="exampleFormControlTextarea5">Inserte la descripción de la incidencia</label>
                                        <textarea className="form-control" name="descripcion" onChange={this.handleChange} value={this.state.descripcion} id="exampleFormControlTextarea5" rows="3" maxLength='550'></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="pagination justify-content-end">
                            <button class="btn btnRed" type="submit">Cancelar</button>
                            <button className="btn btnBlue" type="submit" onClick={this.handleSubmit}>Enviar</button>
                          
                        </div>
                    </div>
                </form>
                <br /> <br /> <br />
            </div>
        )
    }
}

export default Form;