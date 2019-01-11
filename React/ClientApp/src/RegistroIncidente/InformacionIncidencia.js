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
                AreaData: incidentInfo.areaData
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
            <div className="container-fluid">
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
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <div className="Container-div">
                                <div className="form-group blue-border-focus">
                                    <label>Dueño Asignación</label>
                                    <input type="text" class="form-control" placeholder="Readonly input" readonly="readonly" />
                                    <br></br>
                                    <br></br>
                                    <label>Impacto incidencia</label>
                                    <input type="text" class="form-control" value={this.state.TipoImpacto} disabled />
                                    <br></br>
                                    <br></br>
                                    <label>Tecnología incidencia</label>
                                    <input type="text" class="form-control" value={this.state.NombreTecnologia} disabled />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-4 col-md-4">
                            <div className="Container-div">
                                <div className="form-group blue-border-focus">
                                    <label>Tipo incidencia</label>
                                    <input type="text" className="form-control" value={this.state.TipoIncidencia} disabled />
                                    <br></br>
                                    <br></br>
                                    <label>Fecha incidencia</label>
                                    <input type="text" className="form-control" value={this.state.FechaInicidencia} disabled />
                                    <br></br>
                                    <br></br>
                                    <label>Área incidencia</label>
                                    <table className="table table-hover table-condensed " id="table_id">
                                        <thead>
                                            <tr>
                                                <th className="size" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="myTable">
                                            {this.state.AreaData.map(elemento => {
                                                return (
                                                    <tr>
                                                        <td>{elemento} </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div className="col-xs-4 col-md-4">
                            <div className="Container-div">
                                <div className="form-group blue-border-focus">
                                    <label>Estado Actual</label>
                                    <input type="text" className="form-control" value={this.state.MetaEstado} disabled />
                                    <br></br>
                                    <br></br>
                                    <label>Grado incidencia</label>
                                    <input type="text" className="form-control" value={this.state.GradoControl} disabled />
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <button data-toggle="modal" href="#myModal" className="btn btn-block btnBlue">Insertar Pasos</button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}






export default InformacionIncidencia;

