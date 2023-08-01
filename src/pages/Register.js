import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Container,
  Stack,
  Snackbar,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    reEmail: "",
    birthdate: null,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, status) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(status === 0 ? "error" : "success");
    setSnackbarOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.birthdate) {
      showSnackbar("Doğum tarihi alanı boş bırakılamaz.", 0);
      return;
    }

    const apiUrl = "http://localhost:8080/api/user/sign-up";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);
        const { message, status } = response.data;
        showSnackbar(message, status);
        if (status === 1) {
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showSnackbar(
          "İşleminiz gerçekleştirilemedi. Lütfen tekrar deneyiniz.",
          0
        );
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
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
            <h1 className="register-heading">KAYIT OL</h1>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  id="required-username"
                  label="Kullanıcı adı"
                  variant="standard"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <TextField
                  required
                  id="required-email"
                  label="E-posta adresi"
                  variant="standard"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <TextField
                  required
                  id="required-re-email"
                  label="E-posta adresi tekrar"
                  variant="standard"
                  type="email"
                  name="reEmail"
                  value={formData.reEmail}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Doğum tarihi*"
                    name="birthdate"
                    slotProps={{ textField: { variant: "standard" } }}
                    value={formData.birthdate}
                    onChange={(date) =>
                      handleChange({
                        target: {
                          name: "birthdate",
                          value: date,
                        },
                      })
                    }
                    autoComplete="off"
                  />
                </LocalizationProvider>

                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Kayıt Ol
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
