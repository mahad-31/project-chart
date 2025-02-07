// ===========================|| DASHBOARD -  LINE CHART ||=========================== //

const chartData = {
  height: 480,
  type: "line",
  options: {
    chart: {
      id: "line-chart",
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
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
          xaxis: {
            labels: {
              rotate: -45,
              rotateAlways: true
            }
          }
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM",
          day: "dd",
          hour: "hh:mm tt"
        },
        formatter: function(value, timestamp) {
          return new Date(timestamp).toLocaleTimeString('en-US', { 
            hour: 'numeric',
            hour12: true
          });
        }
      },
      min: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      max: new Date(new Date().setHours(24, 0, 0, 0)).getTime(),
      tickAmount: 24,
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      offsetX: 20,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy hhtt"
      },
    },
  },
  series: [
    {
      name: "Person",
      data: [],
    },
    {
      name: "Vehicle",
      data: [],
    },
  ],
};

export default chartData;
