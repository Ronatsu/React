import React, { Component } from 'react';
import Highcharts from "highcharts";
import applyDrilldown from "highcharts/modules/drilldown";
import axios from 'axios';
import {
    Chart,
    ColumnSeries,
    HighchartsChart,
    Subtitle,
    Title,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    withHighcharts
} from "react-jsx-highcharts";


class App1 extends Component {

    state = {
        incidents: [],
    }

    componentDidMount() {
        axios.get(`https://localhost:44357/api/PromedioTiempoContineciaDescubrimientoMes/ObtenerPromTiempoContiDesc`)
            .then(res => {
                const incidents = res.data;
                this.setState({ incidents });
            })
    }


    render() {
        return (
            <div>
                <ul>
                    <HighchartsChart>
                        <Chart type="column" />
                        <Title>Promedio Tiempo de Continencia desde Descubrimiento</Title>
                        <Subtitle>En Horas</Subtitle>
                        <XAxis id="categories" type="category" />
                        <YAxis id="number">
                            <YAxis.Title>Horas</YAxis.Title>
                            {this.state.incidents.map(incident => <ColumnSeries name={incident.mes} data={[{ name: incident.mes, y: incident.cantidadIncidentes },]}
                            />)}
                        </YAxis>
                    </HighchartsChart>
                </ul>
            </div>
        )
    }
}

export default withHighcharts(App1, Highcharts);