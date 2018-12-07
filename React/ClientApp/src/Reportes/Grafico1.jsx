import React from "react";
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

const incidents2 = [];

function dataAxios() {

    axios.get(`http://localhost:63760/api/Reporte/ObtenerIncidente`)
        .then(res => {
            const incidents = res.data;
            return incidents;
        })
}


const App1 = () => (

    <HighchartsChart>
        <Chart type="column" />
        <Title>Ataques frecuentes</Title>
        <Subtitle>Gráfico</Subtitle>

        <XAxis id="categories" type="category" />

        <YAxis id="number">
            <YAxis.Title>Cantidad</YAxis.Title>

            <ColumnSeries
                id="return-contribution"
                colorByPoint
                data = {dataAxios()}
            />
        </YAxis>
    </HighchartsChart>
);


export default withHighcharts(App1, Highcharts);