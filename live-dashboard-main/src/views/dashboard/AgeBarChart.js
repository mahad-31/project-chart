import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";

// third-party
import Chart from "react-apexcharts";

// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { ageChartData } from "./chart-data/bar-chart";
import FormatNumber from "views/utilities/FormatNumber";
import { useSocket } from "context/SocketContext";

// chart data

const timeRanges = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "today",
    label: "Today",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "yearly",
    label: "Yearly",
  },
];

// ==============================|| DASHBOARD - AGE DISTRIBUTION BAR CHART ||============================== //

const AgeBarChart = ({ isLoading }) => {
  const [timeRange, setTimeRange] = useState("all");
  const [chartOptions, setChartOptions] = useState(ageChartData);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const [ageGroupPercentages, setAgeGroupPercentages] = useState({
    "0-17": 0,
    "18-25": 0,
    "26-34": 0,
    "35-60": 0,
    "61+": 0,
  });

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const { persons } = useSocket();

  useEffect(() => {
    // Simulated data - replace with your actual data fetching logic
    const getData = () => {
      let data;
      switch (timeRange) {
        case "today":
          data = [5, 12, 9, 15, 4];
          break;
        case "weekly":
          data = [45, 120, 95, 150, 40];
          break;
        case "yearly":
          data = [550, 1200, 980, 1600, 420];
          break;
        default: // monthly
          data = [150, 480, 320, 580, 140];
      }

      const filterByTimeRange = (persons) => {
        if (timeRange === "all") return persons;
        const now = new Date();
        return persons.filter((person) => {
          const personDate = new Date(person.timestamp);
          switch (timeRange) {
            case "weekly":
              return (
                now.getTime() - personDate.getTime() <= 7 * 24 * 60 * 60 * 1000
              );
            case "monthly":
              return (
                now.getMonth() === personDate.getMonth() &&
                now.getFullYear() === personDate.getFullYear()
              );
            case "yearly":
              return now.getFullYear() === personDate.getFullYear();
            case "today":
              // Check if the date is the same day
              return (
                now.getDate() === personDate.getDate() &&
                now.getMonth() === personDate.getMonth() &&
                now.getFullYear() === personDate.getFullYear()
              );
            default:
              return true; // No filter applied
          }
        });
      };

      const countByGenderAndAge = (data) => {
        const ageClusters = {
          "0-17": 0,
          "18-25": 0,
          "26-34": 0,
          "35-60": 0,
          "61+": 0,
        };

        data.forEach(({ age }) => {
          if (typeof age === "number") {
            if (age <= 17) ageClusters["0-17"]++;
            else if (age <= 25) ageClusters["18-25"]++;
            else if (age <= 34) ageClusters["26-34"]++;
            else if (age <= 60) ageClusters["35-60"]++;
            else ageClusters["61+"]++;
          } else if (typeof age === "string") {
            const formattedAge = age.replace(/[()]/g, "");
            if (ageClusters.hasOwnProperty(formattedAge)) {
              ageClusters[formattedAge]++;
            }
          }
        });

        const totalPersons = data.length || 1;

        const ageGroupPercentages = Object.fromEntries(
          Object.entries(ageClusters).map(([key, value]) => [
            key,
            ((value / totalPersons) * 100).toFixed(2),
          ])
        );

        setAgeGroupPercentages(ageGroupPercentages);

        return Object.values(ageClusters);
      };

      const filteredPersons = filterByTimeRange(persons);

      const newChartData = {
        ...ageChartData,
        series: [
          {
            name: "People",
            data: countByGenderAndAge(filteredPersons),
          },
        ],
      };

      // Update theme-dependent styles
      newChartData.options.xaxis.labels = {
        style: {
          colors: [primary, primary, primary, primary, primary],
        },
      };

      newChartData.options.yaxis.labels = {
        style: {
          colors: [primary],
        },
      };

      newChartData.options.grid = {
        borderColor: grey200,
      };

      setChartOptions(newChartData);
    };

    getData();
  }, [timeRange, navType, primary, grey200, persons]);

  return (
    <MainCard
      sx={{
        marginTop: "50px",
        marginBottom: "40px",
        textAlign: "center",
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1} textAlign={"left"}>
                <Grid item>
                  <Typography variant="subtitle2">Age Distribution</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3">
                    {FormatNumber(
                      chartOptions.series[0].data.reduce((a, b) => a + b, 0)
                    ) || 0}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <span style={{ fontWeight: "bold" }}>0 - 17: </span>
                    {ageGroupPercentages["0-17"]}%
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <span style={{ fontWeight: "bold" }}>18 - 25: </span>
                    {ageGroupPercentages["18-25"]}%{" "}
                  </Typography>
                  <br />

                  <Typography variant="p">
                    <span style={{ fontWeight: "bold" }}>26 - 34: </span>
                    {ageGroupPercentages["26-34"]}%
                  </Typography>
                  <br />

                  <Typography variant="p">
                    <span style={{ fontWeight: "bold" }}>35 - 60: </span>
                    {ageGroupPercentages["35-60"]}%
                  </Typography>
                  <br />

                  <Typography variant="p">
                    <span style={{ fontWeight: "bold" }}>61+: </span>
                    {ageGroupPercentages["61+"]}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-time-range"
                select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                {timeRanges.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Chart {...chartOptions} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

AgeBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default AgeBarChart;
