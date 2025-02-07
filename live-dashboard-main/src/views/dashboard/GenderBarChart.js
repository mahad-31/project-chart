import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";

// third-party
import Chart from "react-apexcharts";

// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";

// chart data
import { genderChartData } from "./chart-data/bar-chart";
import FormatNumber from "views/utilities/FormatNumber";
import { useSocket } from "context/SocketContext";

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

// ==============================|| DASHBOARD - GENDER BAR CHART ||============================== //

const GenderBarChart = ({ isLoading }) => {
  const [timeRange, setTimeRange] = useState("all");
  const [chartOptions, setChartOptions] = useState(genderChartData);
  const [personsData, setPersonsData] = useState({
    male: "0",
    female: "0",
    other: "0",
  });
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { persons } = useSocket();

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  useEffect(() => {
    // Simulated data - replace with your actual data fetching logic
    const getData = () => {
      let data;
      switch (timeRange) {
        case "today":
          data = [10, 5, 2];
          break;
        case "weekly":
          data = [80, 65, 15];
          break;
        case "yearly":
          data = [1500, 1200, 300];
          break;
        default: // monthly
          data = [120, 95, 25];
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
              return (
                now.getDate() === personDate.getDate() &&
                now.getMonth() === personDate.getMonth() &&
                now.getFullYear() === personDate.getFullYear()
              );
            default:
              return true;
          }
        });
      };

      const countGenders = (data) => {
        let genderCounts = { Male: 0, Female: 0, Other: 0 };

        data.forEach((person) => {
          if (genderCounts[person.gender] !== undefined) {
            genderCounts[person.gender]++;
          }
        });

        const totalPersons = data.length;
        const malePercentage = (genderCounts.Male / totalPersons) * 100;
        const femalePercentage = (genderCounts.Female / totalPersons) * 100;
        const otherPercentage = (genderCounts.Other / totalPersons) * 100;

        console.log(
          totalPersons,
          malePercentage,
          femalePercentage,
          otherPercentage
        );

        setPersonsData({
          male: malePercentage.toFixed(2), // Round to 2 decimal places
          female: femalePercentage.toFixed(2),
          other: otherPercentage.toFixed(2),
        });

        return [genderCounts.Male, genderCounts.Female, genderCounts.Other];
      };

      const filteredPersons = filterByTimeRange(persons);

      const newChartData = {
        ...genderChartData,
        series: [
          {
            name: "People",
            data: countGenders(filteredPersons),
          },
        ],
      };
      setChartOptions(newChartData);
    };

    getData();
  }, [timeRange, persons]);

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
                  <Typography variant="subtitle2" textAlign={"left"}>
                    Gender Distribution
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3">
                    {FormatNumber(
                      chartOptions.series[0].data.reduce((a, b) => a + b, 0)
                    ) || 0}
                  </Typography>
                  <Typography variant="p">
                    {" "}
                    Male - {personsData.male}% | Female - {personsData.female}%
                    | Others - {personsData.other}%
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

GenderBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default GenderBarChart;
