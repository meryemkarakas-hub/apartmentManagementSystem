import React, { useState, useEffect } from "react";
import { Box, Button, Container, Paper, Stack, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Activation = () => {
  const [formData, setFormData] = useState({
    password: "",
    rePassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarState({ open: true, message, severity });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8080/api/user/activation";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);

        const { message, status } = response.data;

        if (status === 0) {
          handleSnackbarOpen(message, "error");
        } else if (status === 1) {
          handleSnackbarOpen(message, "success");
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        } else {
          handleSnackbarOpen(message, "info");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        handleSnackbarOpen(
          "Aktivasyon başarısız. Lütfen tekrar deneyin.",
          "error"
        );
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const activationCode = window.location.pathname.split("/").pop();
    setFormData((prevFormData) => ({
      ...prevFormData,
      activationCode,
    }));
  }, []);

  return (
    <>
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
            <h1 className="register-heading">AKTİVASYON</h1>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  id="password"
                  label="Şifre"
                  variant="standard"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  required
                  id="repassword"
                  label="Şifre tekrar"
                  variant="standard"
                  name="rePassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.rePassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Aktivasyonu Gerçekleştir
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Activation;
