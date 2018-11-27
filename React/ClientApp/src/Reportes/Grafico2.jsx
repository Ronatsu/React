import React from 'react';
import Highcharts from 'highcharts';
import addFunnelModule from 'highcharts/modules/funnel';
import {
  HighchartsChart, withHighcharts, Title, FunnelSeries
} from 'react-jsx-highcharts';
//import ExampleCode from '../utils/ExampleCode';
//import code from './exampleCode';

// Apply Funnel Module
addFunnelModule(Highcharts);

const plotOptions = {
  series: {
    dataLabels: {
      enabled: true,
      format: '<b>{point.name}</b> ({point.y:,.0f})',
      softConnector: true
    },
    center: ['40%', '50%'],
    neckWidth: '30%',
    neckHeight: '25%',
    width: '80%'
  }
};

const funnelData = [
  ['Redes sociales', 15654],
  ['Descargas', 4064],
  ['Correos', 1987],
  ['Archivos desconocidos', 976],
  ['Links de vinculación', 846]
];

const Funnel = () => (
  <div className="app">
    <HighchartsChart plotOptions={plotOptions}>
      <Title>Sitios inseguros</Title>

      <FunnelSeries name="Unique users" data={funnelData} />
    </HighchartsChart>


  </div>
);

export default withHighcharts(Funnel, Highcharts);