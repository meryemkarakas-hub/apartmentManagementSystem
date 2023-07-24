import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Container,
  Stack,
  Link,
} from "@mui/material";
import "../App.css";

function Login() {
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
            <h1 className="register-heading">GİRİŞ YAP</h1>
            <Stack direction="column" spacing={3}>
              <TextField
                required
                id="outlined-required-username"
                label="Kullanıcı adı ya da e-posta"
                variant="standard"
              />
              <TextField
                required
                id="outlined-required-password"
                label="Şifre"
                variant="standard"
                name="password"
                type="password"
              />
              <Link href="/forgot-password" variant="body2">
                Şifremi Unuttum
              </Link>
              <Button variant="contained" color="success" size="large">
                Giriş Yap
              </Button>
              <Button variant="contained" color="success" size="large">
                Kayıt Ol
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
