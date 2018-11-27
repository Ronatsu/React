import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';

const plotOptions = {
  series: {
    pointStart: 2010
  }
};

const App = () => (
  <div className="app">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>Casos de incidencia, 2010-2016</Title>

      <Subtitle>Gráfico</Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <XAxis>
        <XAxis.Title>Año</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Cantidad de ataques</YAxis.Title>
        <LineSeries name="Resueltos" data={[5, 34, 23, 10, 8, 35, 17, 6]} />
        <LineSeries name="Espera" data={[4, 5, 7, 1, 10, 3, 2, 2]} />
        <LineSeries name="Desarrollo" data={[null, null, 8, 9, 1, 2, 2, 0]} />
        <LineSeries name="Other" data={[20, 12, 7, 6, 5, 5, 11, 3]} />
      </YAxis>
    </HighchartsChart>
  </div>
);

export default withHighcharts(App, Highcharts);