import React,{ useState, useEffect } from "react";
import { Box, Button, Container, Paper, Stack, TextField } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css";

const Activation = () => {
  const [formData, setFormData] = useState({
    password: "",
    rePassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8080/api/user/activation";

   
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
      toast.error('Aktivasyon başarısız. Lütfen tekrar deneyin.', { position: toast.POSITION.TOP_RIGHT });
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const activationCode = window.location.pathname.split('/').pop();
    setFormData((prevFormData) => ({
      ...prevFormData,
      activationCode,
    }));
  }, []);

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
            <h1 className="register-heading">AKTİVASYON</h1>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  id="outlined-required-reEmail"
                  label="Şifre"
                  variant="standard"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required-email"
                  label="Şifre tekrar"
                  variant="standard"
                  name="rePassword"
                  value={formData.rePassword}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  AKTİVASYONU GERÇEKLEŞTİR
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Activation;
