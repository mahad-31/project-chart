import PropTypes from "prop-types";
import { useEffect } from "react";
// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { useSocket } from "../../context/SocketContext";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";

// assets
import PetsIcon from "@mui/icons-material/Pets";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  Commute,
  Directions,
  DirectionsBus,
  DirectionsCar,
} from "@mui/icons-material";
import FormatNumber from "views/utilities/FormatNumber";



// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${"#673ab7"} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${"#673ab7"} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// Styled Tooltip
const CustomTooltip = styled(Tooltip)({
  "& .MuiTooltip-tooltip": {
    backgroundColor: "#3b134e", // Dark purple background
    color: "#ffffff", // White text
    fontSize: "0.875rem", // Slightly larger text for readability
    textAlign: "center",
    padding: "10px",
    borderRadius: "8px",
  },
});

const JuggleNetworkStats = ({ isLoading }) => {
  const theme = useTheme();
  const { trafficStats } = useSocket();

  // Tooltip Content
  const tooltipContent =
    "Bounce Rate analyses when a person is detected and when there is no engagement with the ad. When gazing is false.";

   
    

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <>
          <CustomTooltip title={tooltipContent} arrow>
            <Typography
              variant="h4"
              color={"#3b134e"}
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginTop: "50px",
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              Juggle's Network Statistics
            </Typography>
          </CustomTooltip>
          <CardWrapper
            border={false}
            content={false}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "40px 0",
              flexWrap: "wrap",
              "& .MuiBox-root": {
                mx: 2,
              },
            }}
          >
            <Box sx={{ p: 2, minWidth: "180px", maxWidth: "200px"  }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: "lightcyan",
                        color: "#673ab7",
                      }}
                    >
                      <PetsIcon fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                      color: "#000",
                      fontWeight: 600,
                      textAlign: "center",
                      "& .MuiTypography-root": {
                        textAlign: "center",
                      },
                    }}
                    primary={
                      <Typography variant="h4">
                        {FormatNumber(trafficStats.totalFootTraffic)}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Total Foot Traffic
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ p: 2, minWidth: "195px", maxWidth: "200px" }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: "lightcyan",
                        color: "#673ab7",
                      }}
                    >
                      <CreditCardIcon fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                      color: "#000",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                    primary={
                      <Typography variant="h4">
                        {trafficStats.frequentFootTraffic <= 1 ? 'TBA' : trafficStats.frequentFootTraffic}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Frequent Foot Traffic
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ p: 2, minWidth: "180px", maxWidth: "200px"  }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: "lightcyan",
                        color: "#673ab7",
                      }}
                    >
                      <PetsIcon fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                      color: "#000",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                    primary={
                      <Typography variant="h4">
                        {trafficStats.uniqueFootTraffic <= 1 ? 'TBA' : trafficStats.uniqueFootTraffic}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Bounce Rate
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </CardWrapper>

          <CardWrapper
            border={false}
            content={false}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "40px 0",
              flexWrap: "wrap",
              "& .MuiBox-root": {
                mx: 2,
              },
            }}
          >
            <Box sx={{ p: 2, minWidth: "180px", maxWidth: "200px" }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: "lightcyan",
                        color: "#673ab7",
                      }}
                    >
                      <DirectionsBus fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                      color: "#000",
                      fontWeight: 600,
                      textAlign: "center",
                      "& .MuiTypography-root": {
                        textAlign: "center",
                      },
                    }}
                    primary={
                      <Typography variant="h4">
                        {trafficStats.totalBus!==0 ? trafficStats.totalBus : 'TBA'}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Total Bus
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ p: 2, minWidth: "195px", maxWidth: "200px" }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: "lightcyan",
                        color: "#673ab7",
                      }}
                    >
                      <DirectionsCar fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                      color: "#000",
                      fontWeight: 600,
                      textAlign: "center",
                      "& .MuiTypography-root": {
                        textAlign: "center",
                      },
                    }}
                    primary={
                      <Typography variant="h4">
                        {trafficStats.totalCar!==0 ? trafficStats.totalCar : 'TBA'}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Total Car
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ p: 2, minWidth: "180px", maxWidth: "200px" }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: "lightcyan",
                        color: "#673ab7",
                      }}
                    >
                      <Commute fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                      color: "#000",
                      fontWeight: 600,
                      textAlign: "center",
                      "& .MuiTypography-root": {
                        textAlign: "center",
                      },
                    }}
                    primary={
                      <Typography variant="h4">
                        {trafficStats.otherVehicles!==0 ? trafficStats.otherVehicles : 'TBA'}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Other Vehicle
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </CardWrapper>

          <Typography
            variant="body1"
            color={"#3b134e"}
            sx={{
              mt: 4,
              mb: 4,
              fontSize: "1rem",
              lineHeight: "1.7",
              textAlign: "center",
            }}
          >
            * Please note the foot traffic data may not capture people in public
            transport, vehicle traffic, nor pedestrians opposite street.
          </Typography>
        </>
      )}
    </>
  );
};

JuggleNetworkStats.propTypes = {
  isLoading: PropTypes.bool,
};

export default JuggleNetworkStats;
