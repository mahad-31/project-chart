export const genderChartData = {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'gender-distribution',
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
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 4,
        },
      },
      xaxis: {
        categories: ['Male', 'Female', 'Other'],
        title: {
          text: 'Gender'
        }
      },
      yaxis: {
        title: {
          text: 'Number of People'
        }
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
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
        opacity: 1,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
        },
      },
      grid: {
        show: true,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " people"
          }
        }
      },
    },
    series: [
      {
        name: 'People',
        data: [], // Empty array to be filled with actual data
      },
    ],
  };
  
  export const ageChartData = {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'age-distribution',
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
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 4,
          distributed: true, // Enable different colors for each bar
        },
      },
      xaxis: {
        categories: ['0-17', '18-25', '26-34', '35-60', '61+'],
        title: {
          text: 'Age Groups'
        }
      },
      yaxis: {
        title: {
          text: 'Number of People'
        }
      },
      legend: {
        show: false, // Hide legend since we're using distributed colors
      },
      fill: {
        opacity: 1,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
        },
      },
      grid: {
        show: true,
      },
      colors: [
        '#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'
      ],
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " people"
          }
        }
      },
    },
    series: [
      {
        name: 'People',
        data: [], // Empty array to be filled with actual data
      },
    ],
  };