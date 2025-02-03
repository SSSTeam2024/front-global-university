import React from 'react';
import getChartColorsArray from "Common/ChartsDynamicColor"
import Chart from 'react-apexcharts'

const StackedAreaChart = ({dataColors}:any) => {
  var BasicAreaChartsColors = getChartColorsArray(dataColors);
  var generateDayWiseTimeSeries = function (baseval:any, count:any, yrange:any) {
      var i = 0;
      var series = [];
      while (i < count) {
          var x = baseval;
          var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

          series.push([x, y]);
          baseval += 86400000;
          i++;
      }
      return series;
  };

  const series = [{
      name: 'Femme',
      data: generateDayWiseTimeSeries(new Date('01 Sep 2024 GMT').getTime(), 20, {
          min: 10,
          max: 60
      })
  },
  {
      name: 'Homme',
      data: generateDayWiseTimeSeries(new Date('01 Sep 2025 GMT').getTime(), 20, {
          min: 10,
          max: 20
      })
  },
  {
      name: 'Total',
      data: generateDayWiseTimeSeries(new Date('01 Sep 2026 GMT').getTime(), 20, {
          min: 10,
          max: 15
      })
  }
  ];
  var options:any = {
      chart: {
          type: 'area',
          height: 350,
          stacked: true,
          toolbar: {
              show: false
          },
          events: {
              selection: function (chart:any, e:any) {
                  console.log(new Date(e.xaxis.min));
              }
          },
      },
      colors: BasicAreaChartsColors,
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: 'smooth'
      },
      fill: {
          type: 'gradient',
          gradient: {
              opacityFrom: 0.6,
              opacityTo: 0.8,
          }
      },
      legend: {
          position: 'top',
          horizontalAlign: 'left'
      },
      xaxis: {
          type: 'datetime'
      },
  };

  return (
      <React.Fragment>
          <Chart
              dir="ltr"
              options={options}
              series={series}
              type="area"
              height="350"
              className="apex-charts"
          />
      </React.Fragment>
  );
};

const SplineAreaChart = ({dataColors}:any) => {
    var areachartSplineColors = getChartColorsArray(dataColors);    
    const series = [{
        name: 'Femmes',
        data: [3154, 3368, 3749, 5170, 4237, 2309, 3326]
    }, {
        name: 'Hommes',
        data: [4620, 4319, 4123, 3485, 5292, 4651, 4155]
    }, {
        name: 'Total',
        data: [7774, 7687, 7872, 8655, 9529, 6960, 7481]
    }];
    var options:any = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        colors: areachartSplineColors,
        xaxis: {
            type: 'datetime',
            categories: ["2018-01-01", "2019-01-01", "2020-01-01", "2021-01-01", "2022-01-01", "2023-01-01", "2024-01-01"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
    };
  
    return (
        <React.Fragment>
            <Chart
                dir="ltr"
                options={options}
                series={series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
  };


export {
  StackedAreaChart,
  SplineAreaChart
};