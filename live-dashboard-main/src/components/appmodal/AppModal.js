import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";

const AppModal = () => {
  const [open, setOpen] = useState(false);
  const [doNotOpenAgain, setDoNotOpenAgain] = useState(false);

  useEffect(() => {
    const userPreference = localStorage.getItem("doNotShowModal");
    if (!userPreference) {
      setOpen(true); // Show the modal if the preference is not set
    }
  }, []);

  const handleClose = () => {
    if (doNotOpenAgain) {
      localStorage.setItem("doNotShowModal", "true");
    }
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "50%",
        }}
      >
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          color={"#3b134e"}
          sx={{ fontWeight: 600 }}
        >
          Welcome to Juggle (Live Network Dashboard)
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2, color: "#3b134e" }}>
          Juggle is a real-time dashboard, audience measurement, and a marketing
          tool that prioritizes clarity and transparency in data collection and
          its calculation while ensuring that all data is gathered with the
          highest accuracy. We only collect vague, anonymous, and ambiguous data that does not
          specifically identify the person.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={doNotOpenAgain}
              onChange={(e) => setDoNotOpenAgain(e.target.checked)}
            />
          }
          label="Do not open again"
          sx={{ mt: 2, color: "#3b134e" }}
        />
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            mt: 2,
            display: "block",
            marginLeft: "auto",
            backgroundColor: "#3b134e",
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AppModal;
