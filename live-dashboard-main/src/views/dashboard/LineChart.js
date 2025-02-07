import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import Chart from "react-apexcharts";
import MainCard from "ui-component/cards/MainCard";

// Initialize WebSocket
const socket = io("http://localhost:5000");

const LineChart = ({ isLoading }) => {
  const [personData, setPersonData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    socket.on("personsList", (data) => {
      console.log("Received persons data:", data);

      // Extract only age & gender
      const filteredData = data.map((person) => ({
        age: person.age,
        gender: person.gender,
      }));

      console.log("Filtered Age & Gender Data:", filteredData);
      setPersonData(filteredData);
    });

    return () => {
      socket.off("personsList");
    };
  }, []);

  // Group data for the chart
  const ageGroups = {};
  const genderCounts = { Male: 0, Female: 0, Other: 0 };

  personData.forEach(({ age, gender }) => {
    ageGroups[age] = (ageGroups[age] || 0) + 1;
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
  });

  // Prepare chart data
  const chartOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { categories: Object.keys(ageGroups) },
    title: { text: "Age Distribution" },
  };

  const series = [
    {
      name: "People",
      data: Object.values(ageGroups),
    },
  ];

  return (
    <MainCard>
      <Grid container spacing={2}>
        {/* Age Distribution Chart */}
        <Grid item xs={12}>
          <Typography variant="h5">Person Informations</Typography>
          <Chart options={chartOptions} series={series} type="bar" height={350} />
        </Grid>

        {/* Gender Count Cards */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Gender Count
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(genderCounts).map(([gender, count]) => (
              <Grid item key={gender} xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{gender}</Typography>
                    <Typography variant="h4">{count}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

LineChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default LineChart;
