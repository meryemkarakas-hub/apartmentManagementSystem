import React, { useState } from "react";
import { Box, Button, Container, Paper, Stack, TextField } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const ForgotPasswordActivation = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8080/api/user/forgot-password-activation";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);

        const { message, status } = response.data;

        if (status === 0) {
          toast.error(message, { position: toast.POSITION.TOP_RIGHT });
        } else if (status === 1) {
          toast.success(message, { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.info(message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("İşleminiz başarısız. Lütfen tekrar deneyin.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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
            <h1 className="register-heading">ŞİFREMİ UNUTTUM</h1>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  id="outlined-required-usernameOrEmail"
                  label="E-posta adresi"
                  variant="standard"
                  type="email"
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
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
