import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Bar3D = ({ data }) => {
  const chartConfigs = {
    type: 'bar3d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Forked',
        yAxisName: 'Forks',
        xAxisName: 'Repos',
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',
        theme: 'fusion',
        decimals: '0',
        pieRadius: '40%',
      },
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Bar3D;
