import React from 'react';
import Navigation from '../components/Navigation';
import '../components/ButtonColor.css';
import axios from 'axios';
import { Link } from "react-router-dom";


class VerificarIncidencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TipoIncidencia: '',
            MetaEstado: '',
            FechaInicidencia: ''
            , FechaDescubrimiento: ''
            , TipoImpacto: ''
            , ProbabilidadImpacto: ''
            , GradoControl: '',
            Descripcion: '',
            TecnologiaData: [],
            AreaData: []
        }

    }
    componentWillMount() {
        this.DataUpload();
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
                Descripcion: incidentInfo.descripcion
                , ProbabilidadImpacto: incidentInfo.probabilidadImpacto
                , FechaDescubrimiento: incidentInfo.fechaDescubrimiento
            });
        })
    }

  
    RechazarIncidencia() {
        axios.post(`http://localhost:44372/api/Incidencia/RechazarIncidencia`, {
            id: this.props.match.params.id
        }).then(res => {
            if (res.status === 200) {

            } else {
                alert("¡Lo sentimos! Ha ocurrido un error")
            }
        })
    }



    render() {
        return (
            <div className="container">
                <Navigation />
                <br /><br /><br />
                <h3>Información de la incidencia</h3>
                <br></br>

                <div id="openModal" className="modal">
                    <div>
                        <a href="#close" title="Close" class="close" onclick="javascript:CloseModal();">X</a>
                        <h2>Mi modal</h2>
                        <p>Este es un ejemplo de modal, creado gracias al poder de CSS3.</p>
                        <p>Puedes hacer un montón de cosas aquí, como alertas o incluso crear un formulario de registro aquí mismo.</p>
                    </div>
                </div>
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



                        </tbody>
                    </table>
                </div>
                <div className=" pagination justify-content-end">
                    <button className="btn btnRed" data-toggle="modal" href="#myModal" >Rechazar</button>
                    <Link to={"/AsignacionIncidencia/"+this.props.match.params.id}> <button className="btn btnBlue" type="submit" value="sumit" >Aceptar y asignar</button></Link>
                </div>
                <br />
                <div className="pagination justify-content-end">
                    <div id="myModal" className="modal fade in">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="txtModal">Rechazar incidencia</h3>
                                </div>
                                <div className="modal-body" id="txtModal">
                                    ¿Estás seguro de querer rechazar esta incidencia?
                                </div>
                                <div className="modal-footer">
                                    <div >
                                        <button className="btn btnRed" data-dismiss="modal"> No</button>
                                        <Link to={"/SinAsignar"}><button className="btn btnBlue" type="submit" value="sumit" onClick={() => this.RechazarIncidencia()}>Sí</button></Link>
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
export default VerificarIncidencia;
