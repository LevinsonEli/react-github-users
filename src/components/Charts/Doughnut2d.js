import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Column2D, CandyTheme);

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: 'doughnut2d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Stars Per Language',
        theme: 'candy',
        decimals: '0',
        pieRadius: '40%',
        showPercentValues: 0,
      },
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
