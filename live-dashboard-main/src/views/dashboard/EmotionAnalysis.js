import PropTypes from "prop-types";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";
import { useSocket } from "../../context/SocketContext";

// assetss
import { InsertEmoticon } from "@mui/icons-material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

// Updated styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
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

const EmotionAnalysis = ({ isLoading }) => {
  const theme = useTheme();
  const { emotionStats } = useSocket();

  // Tooltip Content
  const tooltipContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false} sx={{position: "relative"}}>
          <Box sx={{position: "absolute", 
                    display: "flex", 
                    flexDirection: "column",
                    justifyContent:"center",
                    alignItems: "center",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.2)", // Semi-transparent black
                    backdropFilter: "blur(5px)", // Blur effect
                    zIndex: 50
             }}>
         <Typography variant="h1" color="black" fontWeight="bold" display="block">
          Under
        </Typography>
        <Typography variant="h1" color="black" fontWeight="bold" display="block">
          Development
        </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {/* Custom Tooltip wrapping the heading */}
            <CustomTooltip title={tooltipContent} arrow>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#3b134e",
                  textAlign: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textTransform: "capitalize",
                  cursor: "pointer", // Pointer indicates interaction
                }}
              >
                How we measure data
              </Typography>
            </CustomTooltip>

            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: 2,
                py: 1,
              }}
            >
              {[
                { icon: <InsertEmoticon />, title: "Joy", color: "#673ab7" },
                {
                  icon: <SentimentVeryDissatisfiedIcon />,
                  title: "Anger",
                  color: "red",
                },
                {
                  icon: <SentimentDissatisfiedIcon />,
                  title: "Sadness",
                  color: "green",
                },
                {
                  icon: <SentimentVeryDissatisfiedIcon />,
                  title: "Disgust",
                  color: "green",
                },
                {
                  icon: <SentimentVeryDissatisfiedIcon />,
                  title: "Surprise",
                  color: "yellow",
                },
                {
                  icon: <SentimentSatisfiedIcon />,
                  title: "Neutral",
                  color: "gray",
                },
              ].map((item, index) => (
                <ListItem
                  key={index}
                  alignItems="center"
                  disableGutters
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexBasis: "calc(33.33% - 16px)",
                    maxWidth: "calc(33.33% - 16px)",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: item.color,
                      color: "#fff",
                      marginBottom: 1,
                      borderRadius: "50%",
                      width: 56,
                      height: 56,
                    }}
                  >
                    {item.icon}
                  </Avatar>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#000",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#000",
                      textAlign: "center",
                    }}
                  >
                    {emotionStats.emotionBreakdown[item.title]}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

EmotionAnalysis.propTypes = {
  isLoading: PropTypes.bool,
};

export default EmotionAnalysis;
