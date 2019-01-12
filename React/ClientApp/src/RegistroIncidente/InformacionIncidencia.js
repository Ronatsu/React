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
            GradoControl: '',
            Descripcion: '',
            NombreCompleto: '',
            TecnologiaData: [],
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
                TecnologiaData: incidentInfo.tecnologiaData,
                GradoControl: incidentInfo.gradoControl,
                AreaData: incidentInfo.areaData,
                StepData: incidentInfo.stepsData,
                Descripcion: incidentInfo.descripcion,
                NombreCompleto: incidentInfo.nombreCompleto
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
                    <table className="table table-hover table-bordered " id="table_id">
                        <thead>
                            <tr>
                                <th className="size" scope="col">Información</th>
                                <th className="size" scope="col">Datos</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="size" scope="row">Dueño de Asignación</th>
                                <td>{this.state.NombreCompleto} </td>
                            </tr>
                            <tr>
                                <th className="size" scope="row">Impacto</th>
                                <td>{this.state.TipoImpacto} </td>
                            </tr>
                            <tr>
                                <th className="size" scope="row">Descipción</th>
                                <td>{this.state.Descripcion} </td>
                            </tr>
                            <tr>
                                <th className="size" scope="row">Tipo</th>
                                <td>{this.state.TipoIncidencia} </td>
                            </tr>
                            <tr>
                                <th className="size" scope="row">Fecha</th>
                                <td>{this.state.FechaInicidencia} </td>
                            </tr>
                            <tr>
                                <th className="size" scope="row">Estado</th>
                                <td>{this.state.MetaEstado} </td>
                            </tr>
                            <tr>
                                <th className="size" scope="row">Grado</th>
                                <td>{this.state.GradoControl} </td>
                            </tr>
                            <tr>
                                <details>
                                    <summary>Pasos Registrados</summary>
                                    <table className="table table-hover" id="table_id">
                                        <thead>
                                            <tr>
                                                <th className="size" scope="col">Paso</th>
                                                <th className="size" scope="col">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.StepData.map(elemento => {
                                                return (
                                                    <tr>
                                                        <td>- {elemento.descripcion}</td>
                                                        <td>- {elemento.estado}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </details>
                            </tr>
                            <tr>
                                <th rowSpan="2" className="size" scope="row">Área afectada</th>
                                <table className="table table-hover" id="table_id">
                                    <thead>
                                        <tr>
                                            <th className="size" scope="row">Área</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.AreaData.map(elemento => {
                                            return (
                                                <tr>
                                                    <td>- {elemento}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </tr>
                            <tr>
                                <th rowSpan="2" className="size" scope="row">Tecnologias afectadas</th>
                                <table className="table table-hover" id="table_id">
                                    <thead>
                                        <tr>
                                            <th className="size" scope="row">Tecnologia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.TecnologiaData.map(elemento => {
                                            return (
                                                <tr>
                                                    <td>- {elemento}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </tr>
                        </tbody>
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

