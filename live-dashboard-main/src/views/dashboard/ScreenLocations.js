import PropTypes from "prop-types";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Box, List, ListItem, Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";

// assets
import { Link } from "react-router-dom";

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

const ScreenLocations = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <>
          <Typography
            variant="h6"
            color={"#3b134e"}
            sx={{
              fontSize: "1.2rem",
              paddingTop: "20px",
              paddingBottom: "20px",
              fontWeight: 600,
            }}
          >
            Screen Locations
          </Typography>
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2 }}>
              <List sx={{ py: 1 }}>
                <ListItem
                  alignItems="center"
                  disableGutters
                  sx={{
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Left Side (Icon + Title) */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#000000",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                      }}
                    >
                      Skyworld Entertainment - Screen 1
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "green",
                    }}
                  >
                    Online
                  </Typography>
                </ListItem>
              </List>
              <List sx={{ py: 1 }}>
                <ListItem
                  alignItems="center"
                  disableGutters
                  sx={{
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Left Side (Icon + Title) */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#000000",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                      }}
                    >
                      Skyworld Entertainment - Screen 2
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "green",
                    }}
                  >
                    Online
                  </Typography>
                </ListItem>
              </List>
              <List sx={{ py: 1 }}>
                <ListItem
                  alignItems="center"
                  disableGutters
                  sx={{
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Left Side (Icon + Title) */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#000000",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                      }}
                    >
                      Faro BBQ  - Lorne Street (Shopfront Window)
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "red",
                    }}
                  >
                    Coming Soon
                  </Typography>
                </ListItem>
              </List>
              <List sx={{ py: 1 }}>
                <ListItem
                  alignItems="center"
                  disableGutters
                  sx={{
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Left Side (Icon + Title) */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#000000",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                      }}
                    >
                      Burger Time - Queen Street (Shopfront Window)
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "red",
                    }}
                  >
                    Coming Soon
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </CardWrapper>
        </>
      )}
    </>
  );
};

ScreenLocations.propTypes = {
  isLoading: PropTypes.bool,
};

export default ScreenLocations;
