﻿import React, { Component } from 'react';
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


class App5 extends Component {

    state = {
        incidents: [],
    }

    componentDidMount() {
        axios.get(`https://localhost:44357/api/Reporte/ObtenerIncidentesAnno`)
            .then(res => {
                const incidents = res.data;
                this.setState({ incidents });
            })
    }

    render() {
        const plotOptions = {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    softConnector: true
                },
            }
        };
        return (
            <div>
                <ul>
                    <HighchartsChart plotOptions={plotOptions}>
                        <Chart type="column" />
                        <Title>Total incidentes anuales</Title>
                        <Subtitle>En Cantidad</Subtitle>
                        <XAxis id="categories" type="category" />
                        <YAxis id="number">
                            <YAxis.Title>Cantidad</YAxis.Title>
                            {this.state.incidents.map(incident => <ColumnSeries name={incident.mes} data={[{ name: incident.mes, y: incident.cantidadIncidentes },]}
                            />)}
                        </YAxis>
                    </HighchartsChart>
                </ul>
            </div>
        )
    }
}

export default withHighcharts(App5, Highcharts);