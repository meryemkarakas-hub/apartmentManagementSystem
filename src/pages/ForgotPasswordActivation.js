import React, { useState } from "react";
import { Box, Button, Container, Paper, Snackbar, Stack, TextField } from "@mui/material";
import { Alert } from "@mui/lab"; // Import the Alert component from @mui/lab
import axios from "axios";
import "../App.css";

const ForgotPasswordActivation = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8080/api/user/forgot-password-activation";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);

        const { message, status } = response.data;

        if (status === 0) {
          setSnackbarMessage(message);
          setSnackbarSeverity("error");
        } else if (status === 1) {
          setSnackbarMessage(message);
          setSnackbarSeverity("success");
        } else {
          setSnackbarMessage(message);
          setSnackbarSeverity("info");
        }

        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSnackbarMessage("İşleminiz başarısız. Lütfen tekrar deneyin.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={3}>
          <Box m={3} p={2}>
            <h1 className="register-heading">ŞİFREMİ UNUTTUM</h1>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  id="outlined-required-email"
                  label="E-posta adresi"
                  variant="standard"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Aktivasyon Kodu Gönder
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ForgotPasswordActivation;
