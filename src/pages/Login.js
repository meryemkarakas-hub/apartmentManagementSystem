import React from "react";
import { Box, Paper, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";
import backgroundImage from "../images/SOFT.jpg"; // Arka plan resminin yolunu değiştirin

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
            <h1 className="register-heading">GİRİŞ YAP</h1>
            <Stack direction="column" spacing={3}>
              <Button
                variant="contained"
                color="info"
                size="large"
                component={Link}
                to="/register"
              >
                KAYIT OL
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
