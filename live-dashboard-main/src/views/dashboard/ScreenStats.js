import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
import { MoreTime, ShareLocation } from "@mui/icons-material";

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

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const ScreenStats = ({ isLoading }) => {
  const theme = useTheme();
  const { socket } = useSocket();
  const [stats, setStats] = useState({
    liveScreens: 2,
    uptime: "100%",
    comingSoon: 2,
  });

  // Tooltip Content
  const tooltipContent =
    "The number of Juggle screens deployed and are up running.";

  useEffect(() => {
    if (socket) {
      socket.on("screenStats", (data) => {
        console.log(data);
        setStats(data);
      });
    }
  }, [socket]);

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
              Screen Network Statistics
            </Typography>
          </CustomTooltip>
          <CardWrapper
            border={false}
            content={false}
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "40px 0",
              justifyContent: "center",
              margin: "40px 0",
              flexWrap: "wrap",
              "& .MuiBox-root": {
                mx: 2,
              },
            }}
          >
            <Box sx={{ p: 2,minWidth: "210px", maxWidth: "250px"  }}>
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
                      <ShareLocation fontSize="inherit" />
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
                      <Typography variant="h4">{stats.liveScreens}</Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Live Deployed Screens
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ p: 2,minWidth: "140px", maxWidth: "200px"   }}>
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
                      <MoreTime fontSize="inherit" />
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
                      <Typography variant="h4">{stats.uptime}</Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Uptime
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ p: 2,minWidth: "210px", maxWidth: "250px"   }}>
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
                      <ShareLocation fontSize="inherit" />
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
                      <Typography variant="h4">{stats.comingSoon}</Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                        }}
                      >
                        Screens Coming Soon
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </CardWrapper>
        </>
      )}
    </>
  );
};

ScreenStats.propTypes = {
  isLoading: PropTypes.bool,
};

export default ScreenStats;
