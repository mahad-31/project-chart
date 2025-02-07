import { useEffect, useState } from "react";

import PropTypes from "prop-types";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";

// assets
import { Link } from "react-router-dom";
import { useSocket } from "context/SocketContext";

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

const AudienceData = ({ isLoading }) => {
  const theme = useTheme();

  const [personsData, setPersonsData] = useState({
    male: "0",
    female: "0",
    other: "0",
    averageAgeRange: "", // New state for average age range
  });

  const { persons } = useSocket();

  useEffect(() => {
    const getData = () => {
      const countByGenderAndAge = (data) => {
        let genderCounts = {
          Male: 0,
          Female: 0,
          Other: 0,
        };

        let ageClusters = {
          "0-17": 0,
          "18-25": 0,
          "26-34": 0,
          "35-60": 0,
          "61+": 0,
        };

        data.forEach((person) => {
          if (person.gender === "Male") genderCounts.Male++;
          else if (person.gender === "Female") genderCounts.Female++;
          else genderCounts.Other++;

          if (typeof person.age === "number") {
            if (person.age <= 17) ageClusters["0-17"]++;
            else if (person.age <= 25) ageClusters["18-25"]++;
            else if (person.age <= 34) ageClusters["26-34"]++;
            else if (person.age <= 60) ageClusters["35-60"]++;
            else if (person.age > 60) ageClusters["61+"]++;
          } else if (typeof person.age === "string") {
            ageClusters[person.age.replace(/[()]/g, "")]++;
          }
        });

        const totalPersons = data.length;

        const maxCount = Math.max(...Object.values(ageClusters));
        const maxAgeGroups = Object.keys(ageClusters)
          .filter((key) => ageClusters[key] === maxCount)
          .join(" | ");

        // Calculate percentages
        const malePercentage = (genderCounts.Male / totalPersons) * 100;
        const femalePercentage = (genderCounts.Female / totalPersons) * 100;
        const otherPercentage = (genderCounts.Other / totalPersons) * 100;

        // Update the state with percentages and average age range
        setPersonsData({
          male: malePercentage.toFixed(2),
          female: femalePercentage.toFixed(2),
          other: otherPercentage.toFixed(2),
          averageAgeRange: maxAgeGroups,
        });
      };

      countByGenderAndAge(persons);
    };

    getData();
  }, [persons]);

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
            Average Audience Data
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
                      Engagement Time
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    3 Seconds
                  </Typography>
                </ListItem>
              </List>
              <Divider />
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
                      Dwell Time
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    10 Seconds
                  </Typography>
                </ListItem>
              </List>
              <Divider />
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
                      Facial Features
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    TBA
                  </Typography>
                </ListItem>
              </List>
              <Divider />
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
                      Gender
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    Male {personsData.male || "-"}% | Female{" "}
                    {personsData.female}% | Other {personsData.other}%
                  </Typography>
                </ListItem>
              </List>
              <Divider />
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
                      Age Group
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    {personsData.averageAgeRange || " 29-40"}
                  </Typography>
                </ListItem>
              </List>
              <Divider />
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
                      Ethnicity
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    TBA
                  </Typography>
                </ListItem>
              </List>
              <Divider />
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
                      Emotion
                    </Typography>
                  </Box>

                  {/* Right Side (Number) */}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "right",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    TBA
                  </Typography>
                </ListItem>
              </List>
              <Divider />
              <Box sx={{ p: 1 }}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#673ab7",
                    fontSize: "0.7rem",
                    textAlign: "center",
                    display: "block",
                    margin: "auto",
                    cursor: "pointer",
                    fontWeight: 600,
                    lineHeight: "15px",
                    marginTop: "10px",
                  }}
                >
                  Login to see Full Audience Data
                </Link>
              </Box>
            </Box>
          </CardWrapper>
        </>
      )}
    </>
  );
};

AudienceData.propTypes = {
  isLoading: PropTypes.bool,
};

export default AudienceData;
