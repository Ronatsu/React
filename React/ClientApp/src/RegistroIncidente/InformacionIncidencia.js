import React from 'react';
import Navigation from '../components/Navigation';
import '../components/ButtonColor.css';
import axios from 'axios';

class InformacionIncidencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TipoIncidencia: '',
            MetaEstado: '',
            FechaInicidencia: '',
            TipoImpacto: '',
            NombreTecnologia: '',
            GradoControl: '',
            AreaData: [],
            StepData: [],
            Step: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.DataUpload();
        //this.SaveIncidentStep();
    }
    DataUpload() {
        axios.post(`http://localhost:44372/api/GetIncidents/GetInformationIncident`, {
            incidenciaID: this.props.match.params.id
        }).then(res => {
            const incidentInfo = res.data;
            this.setState({
                TipoIncidencia: incidentInfo.tipoIncidencia,
                MetaEstado: incidentInfo.metaEstado,
                FechaInicidencia: incidentInfo.fechaInicidencia,
                TipoImpacto: incidentInfo.tipoImpacto,
                NombreTecnologia: incidentInfo.nombreTecnologia,
                GradoControl: incidentInfo.gradoControl,
                AreaData: incidentInfo.areaData,
                StepData: incidentInfo.stepsData
            });
        })
    }
    handleChange = (event) => {
        this.setState({ Step: event.target.value });
    };
    SaveIncidentStep() {
        axios.post(`http://localhost:44372/api/GetIncidents/MethodInsertStep`, {
            description: this.state.Step,
            idIncidencia: this.props.match.params.id
        })
    }
    render() {
        return (
            <div className="container">
                <Navigation />
                <form className="container" >
                    <fieldset className="fields">
                        <header className="App-header">
                            <br /><br /><br />
                            <h3 className="mt-4">Información de la incidencia</h3>
                        </header>
                        <div>
                            <br></br>
                        </div>
                    </fieldset>
                </form>
                <div className="container table-responsive" id="main_div">
                    <table className="table table-hover table-condensed " id="table_id">
                        <tr>
                            <th className="size" scope="col"></th>
                        </tr>
                        <tr>
                            <th className="size" scope="col">Impacto</th>
                            <td>{this.state.TipoImpacto} </td>
                        </tr>
                        <tr>
                            <th className="size" scope="col">Tecnología</th>
                            <td>{this.state.NombreTecnologia} </td>
                        </tr>
                        <tr>
                            <th className="size" scope="col">Tipo</th>
                            <td>{this.state.TipoIncidencia} </td>
                        </tr>
                        <tr>
                            <th className="size" scope="col">Fecha</th>
                            <td>{this.state.FechaInicidencia} </td>
                        </tr>
                        <tr>
                            <th className="size" scope="col">Estado</th>
                            <td>{this.state.MetaEstado} </td>
                        </tr>
                        <tr>
                            <th className="size" scope="col">Grado</th>
                            <td>{this.state.GradoControl} </td>
                        </tr>
                        <tr>
                            <th rowSpan="2" className="size" scope="col">Área afectada</th>
                            {this.state.AreaData.map(elemento => {
                                return (
                                    <tr>
                                        <td>- {elemento}</td>
                                    </tr>
                                )
                            })}
                        </tr>
                        <details>
                            <summary>Pasos Registrados</summary>
                            {this.state.StepData.map(elemento => {
                                return (
                                    <tr>
                                        <td>- {elemento.descripcion}</td>
                                        <td>- {elemento.estado}</td>
                                    </tr>
                                )
                            })}
                            </details>
                    </table>
                </div>
                <button data-toggle="modal" href="#myModal" className="btn btnBlue">Insertar Pasos</button>
                <div className="pagination justify-content-end">
                    <div id="myModal" className="modal fade in">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Inserte los pasos realizados</h4>
                                </div>
                                <div className="modal-body">
                                    <textarea className="form-control" rows="5" onChange={this.handleChange}></textarea>
                                </div>
                                <div className="modal-footer">
                                    <div class="btn-group">
                                        <button className="btn btnRed" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancelar</button>
                                        <button className="btn btnBlue" type="submit" value="sumit" onClick={() => this.SaveIncidentStep()}><span class="glyphicon glyphicon-check"></span> Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}






export default InformacionIncidencia;

