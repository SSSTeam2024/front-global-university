import React from 'react';
import getChartColorsArray from "Common/ChartsDynamicColor";
import Chart from 'react-apexcharts';

const CustomDataLabel = ({ dataColors }:any) => {
  var chartDatalabelsBarColors = getChartColorsArray(dataColors);
  const series = [{
      data: [4, 13, 7]
  }];
  var options:any = {
      chart: {
          type: 'bar',
          height: 350,
          toolbar: {
              show: false,
          }
      },
      plotOptions: {
          bar: {
              barHeight: '100%',
              distributed: true,
              horizontal: true,
              dataLabels: {
                  position: 'bottom'
              },
          }
      },
      colors: chartDatalabelsBarColors,
      dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
              colors: ['#fff']
          },
          formatter: function (val:any, opt:any) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
              enabled: false
          }
      },
      stroke: {
          width: 1,
          colors: ['#fff']
      },
      xaxis: {
          categories: ['ENIGA', 'ISSAT', 'IPEIG'
          ],
      },
      yaxis: {
          labels: {
              show: false
          }
      },
      title: {
          text: 'Activités',
          align: 'center',
          floating: true,
          style: {
              fontWeight: 500,
          },
      },
      subtitle: {
          text: 'Nombre des activités selon établissement',
          align: 'center',
      },
      tooltip: {
          theme: 'dark',
          x: {
              show: false
          },
          y: {
              title: {
                  formatter: function () {
                      return '';
                  }
              }
          }
      }
  };
  return (
      <React.Fragment>
          <Chart
              dir="ltr"
              className="apex-charts"
              options={options}
              series={series}
              type="bar"
              height={350}
          />
      </React.Fragment>
  );
};

export {
  CustomDataLabel
};