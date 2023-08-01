import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8080/api/user/login";

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
            navigate("/application");
          }, 6000);
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

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
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
            <h1 className="register-heading">GİRİŞ YAP</h1>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  id="required-userNameOrEmail"
                  label="Kullanıcı adı ya da e-posta"
                  variant="standard"
                  name="userNameOrEmail"
                  value={formData.userNameOrEmail}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <TextField
                  required
                  id="password-field"
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
                <Link variant="body2" onClick={handleForgotPasswordClick}>
                  Şifremi Unuttum
                </Link>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Giriş Yap
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleRegisterClick}
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

export default Login;
