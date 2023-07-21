import React, { useState } from "react";
import { Box, Paper, TextField, Button, Container, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../images/SOFT.jpg"; // Arka plan resminin yolunu değiştirin

import "../App.css";

const Register = () => {
  const styles = {
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "98vh",
      maxWidth:"100% !important" ,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "24px",
      fontFamily: "Arial, sans-serif"
    },
  };


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    reEmail: "",
    birthdate: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl = "http://localhost:8080/api/user/sign-up";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
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
      <Container
        maxWidth="sm"
        sx={
          styles.background
        }
      >
        <Paper elevation={3}>
          <Box m={3} p={2}>
            <h1 className="register-heading">KAYIT OL</h1>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  id="outlined-required-username"
                  label="Kullanıcı adı"
                  variant="standard"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required-email"
                  label="E-posta adresi"
                  variant="standard"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required-re-email"
                  label="E-posta adresi tekrar"
                  variant="standard"
                  type="email"
                  name="reEmail"
                  value={formData.reEmail}
                  onChange={handleChange}
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
                  />
                </LocalizationProvider>

                <Button variant="contained" color="success" size="large" type="submit">
                  Register
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
