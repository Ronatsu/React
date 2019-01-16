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
            FechaVerificacion: ''
            , FechaDescubrimiento: ''
            , TipoImpacto: ''
            , ProbabilidadImpacto: ''
            , GradoControl: '',
            Descripcion: '',
            AsignadaA: '',
            AsignadaPor: '',
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
                AsignadaA: incidentInfo.asignadaA
                , AsignadaPor: incidentInfo.asignadaPor
                , ProbabilidadImpacto: incidentInfo.probabilidadImpacto
                , FechaDescubrimiento: incidentInfo.fechaDescubrimiento
                , FechaVerificacion: incidentInfo.fechaVerificacion
            });
        })
    }

    handleChange = (event) => {
        this.setState({ Step: event.target.value });
    };

    SaveIncidentStep() {
        if (this.state.Step === "") {
            alert("Inserte el nombre del área que desea modificar.");
        } else {
            axios.post(`http://localhost:44372/api/GetIncidents/MethodInsertStep`, {
                description: this.state.Step,
                idIncidencia: this.props.match.params.id
            }).then(res => {
                if (res.data === "") {
                    alert("Agregado con éxito")
                    console.log()
                    this.setState({
                        Step: ""
                    });
                } else {
                    alert("¡Lo sentimos! Ha ocurrido un error inesperado")
                }
            } )
        }
    }




    render() {
        return (
            <div className="container">
                <Navigation />
                <br /><br /><br />
                <h3>Información de la incidencia</h3>
                <br></br>


                <div className="table" id="main_div">
                    <table className="table table-hover table-bordered " id="table_id">
                        <thead>
                            <tr>
                                <th className="size" scope="col"></th>
                                <th className="size" scope="col">Detalles</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Asignado a</th>
                                <td>{this.state.AsignadaA} </td>
                            </tr>
                            <tr>
                                <th scope="row">Asignado por</th>
                                <td>{this.state.AsignadaPor} </td>
                            </tr>
                            <tr>
                                <th className="" >Nivel de impacto</th>
                                <td>{this.state.TipoImpacto} </td>
                            </tr>
                            <tr>
                                <th className="" >Probabilidad de impacto</th>
                                <td>{this.state.ProbabilidadImpacto} </td>
                            </tr>
                            <tr>
                                <th className="">Descipción</th>
                                <td>{this.state.Descripcion} </td>
                            </tr>
                            <tr>
                                <th className="" scope="row">Tipo</th>
                                <td>{this.state.TipoIncidencia} </td>
                            </tr>
                            <tr>
                                <th className="">Fecha de reporte</th>
                                <td>{this.state.FechaInicidencia} </td>
                            </tr>
                            <tr>
                                <th className="">Fecha de descubriento</th>
                                <td>{this.state.FechaDescubrimiento} </td>
                            </tr>
                            <tr>
                                <th className="">Fecha de verificación</th>
                                <td>{this.state.FechaVerificacion} </td>
                            </tr>
                            <tr>
                                <th className="">Estado</th>
                                <td>{this.state.MetaEstado} </td>
                            </tr>
                            <tr>
                                <th className="" >Grado de control</th>
                                <td>{this.state.GradoControl} </td>
                            </tr>

                            <tr>
                                <th className="">Tecnología afectadas</th>
                                <td>  {this.state.TecnologiaData.map(elemento => {
                                    return (
                                        <tr>
                                            - {elemento}
                                        </tr>
                                    )
                                })}
                                </td>
                            </tr>
                            <tr>
                                <th className="">Áreas afectada</th>
                                <td> {this.state.AreaData.map(elemento => {
                                    return (
                                        <tr>
                                            - {elemento}
                                        </tr>
                                    )
                                })}
                                </td>
                            </tr>
                            <tr>

                                <th className="">Pasos Registrados</th>
                                <td> {this.state.StepData.map(elemento => {
                                    return (
                                        <tr>
                                            - {elemento.descripcion}
                                        </tr>
                                    )
                                })}</td>

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
                                    <h4 className="modal-title" id="txtModal">Inserte los pasos realizados</h4>
                                </div>
                                <div className="modal-body">
                                    <textarea className="form-control" rows="5" onChange={this.handleChange}></textarea>
                                </div>
                                <div className="modal-footer">
                                    <div class="btn-group">
                                        <button className="btn btnRed" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cerrar</button>
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

