import getChartColorsArray from "Common/ChartsDynamicColor";
import Chart from 'react-apexcharts'

const StackedColumn2 = ({ dataColors }:any) => {
  var chartColumnStacked100Colors = getChartColorsArray(dataColors);
  const series = [
      {
          name: "Homme",
          data: [13, 23, 20, 8, 13, 27,15, 13],
      },
      {
          name: "Femme",
          data: [11, 17, 15, 15, 21, 14,  33, 12],
      },
  ];

  const options:any = {

      chart: {
          stacked: !0,
          stackType: "100%",
          toolbar: {
              show: !1,
          },
      },
      responsive: [
          {
              breakpoint: 480,
              options: {
                  legend: {
                      position: "bottom",
                      offsetX: -10,
                      offsetY: 0,
                  },
              },
          },
      ],
      xaxis: {
          categories: [
              "2017",
              "2018",
              "2019",
              "2020",
              "2021",
              "2022",
              "2023",
              "2024",
          ],
      },
      fill: {
          opacity: 1,
      },
      legend: {
          position: "right",
          offsetX: 0,
          offsetY: 50,
      },
      colors: chartColumnStacked100Colors,
  };

  return <Chart dir="ltr" className="apex-charts" series={series} options={options} type="bar" height={350} />;
};

export {
  StackedColumn2,
};