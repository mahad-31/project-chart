import { useEffect, useState } from "react";

// material-ui
import { Box, Grid, Typography } from "@mui/material";

// project imports
import ScreenStats from "./ScreenStats";
import { gridSpacing } from "store/constant";
import EmotionAnalysis from "./EmotionAnalysis";
import JuggleNetworkStats from "./JuggleNetworkStats";
import LineChart from "./LineChart";
import ScreenLocations from "./ScreenLocations";
import AudienceData from "./AudienceData";
import GenderBarChart from "./GenderBarChart";
import AgeBarChart from "./AgeBarChart";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={7}>
        <Box sx={{ paddingTop: "20px" }}>
          <Typography
            variant="h1"
            color={"#3b134e"}
            sx={{ fontSize: "2rem", fontWeight: 600 }}
          >
            Welcome to Juggle. Discover Hidden Patterns of Walking Audience in
            Real-Time. Make More Informed Strategic, Data-Driven Decisions.
          </Typography>
          <Typography
            variant="body1"
            color={"#3b134e"}
            sx={{ mt: 2, mb: 2, fontSize: "1rem", lineHeight: "1.7" }}
          >
            Catch a glimpse of the future. Just like snorkling masks but for buyers/planners and marketing
            teams. From market research, strategy, planning and advertising. Juggle Live is a
            real-time dashboard/audience measurement tool. Ensure that decisions
            are informed, targeted, and optimized for better outcomes. Analyze
            transactional and emotional data and make precise decisions for your
            target audience effectively and efficiently to maximise your results
            and have the biggest impact. Incredibly Powerful AI Planning Tool
            Coming Soon.
          </Typography>
        </Box>
        <ScreenStats loading={isLoading} />
        <JuggleNetworkStats loading={isLoading} />
        <LineChart loading={isLoading} />
        <GenderBarChart isLoading={isLoading}/>
        <AgeBarChart isLoading={isLoading}/>
      </Grid>
      <Grid item xs={5}>
        <Typography
          variant="h6"
          color={"#3b134e"}
          sx={{ fontSize: "1.2rem", paddingTop: "25px", fontWeight: 600 }}
        >
          Emotion Analysis
        </Typography>
        <Typography
          variant="body1"
          color={"#3b134e"}
          sx={{ mt: 1, mb: 1, fontSize: "1rem", lineHeight: "1.7" }}
        >
          Currently on live stream in Auckland CBD. Feel free to see how we
          track & analyse data. We only collect & save vague anonymous and 
          ambiguous data that does not specifically identify the person while 
          ensuring that all data is gathered with the highest accuracy.
        </Typography>
        <Box sx={{ margin: "20px 0px" }}>
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/akv2IChQKgE?autoplay=1&controls=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Box>
        <EmotionAnalysis isLoading={isLoading} />
        <Box sx={{ margin: "10px 0px" }}>
          <ScreenLocations isLoading={isLoading} />
        </Box>
        <Box sx={{ margin: "10px 0px" }}>
          <AudienceData isLoading={isLoading} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
