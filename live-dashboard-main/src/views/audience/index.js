import { useEffect, useState } from "react";

// material-ui
import { Box, Grid, Typography } from "@mui/material";

// project imports
import { gridSpacing } from "store/constant";
import { Link } from "react-router-dom";
import { fontSize, margin, textAlign } from "@mui/system";

// ==============================|| DEFAULT Audience ||============================== //

const Audience = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Box sx={{ paddingTop: "80px" }}>
          <Typography
            variant="h1"
            color={"#3b134e"}
            sx={{
              fontSize: "4rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Creating Real World Magic
          </Typography>
          <Box
            sx={{
              fontSize: "1.2rem",
              fontWeight: 500,
              textAlign: "center",
              margin: "20px 0px",
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#000000",
                lineHeight: "26px",
              }}
            >
              Under Development & Coming Soon - Please login to view footfall, demographic data and patterns of walking traffic.
              around the location.
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Audience;
