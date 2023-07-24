import React, { useState } from "react";
import { Box, Paper, TextField, Button, Container, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    reEmail: "",
    birthdate: null,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.birthdate) {
      toast.error("Doğum Tarihi alanı boş bırakılamaz.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const apiUrl = "http://localhost:8080/api/user/sign-up";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);
        const { message, status } = response.data;

        if (status === 0) {
          toast.error(message, { position: toast.POSITION.TOP_RIGHT });
        } else if (status === 1) {
          toast.success(message, { position: toast.POSITION.TOP_RIGHT });
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        } else {
          toast.info(message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("İşleminiz gerçekleştirilemedi. Lütfen tekrar deneyin.", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
      <ToastContainer />
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
                  id="outlined-required-username"
                  label="Kullanıcı adı"
                  variant="standard"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off" 
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
                  autoComplete="off" 
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
