import React, { Component } from "react";
import { Box, Paper, TextField, Button, Container, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../App.css";

export default class Register extends Component {
  render() {
    return (
      <>
        <Container maxWidth="sm" sx={{justifyContent:'center',display: 'flex',alignItems:'center',height:'100vh'}}>
          <Paper elevation={3}>
            <Box m={3} p={2}>
              <h1 className="register-heading">REGISTER</h1>
              <Stack direction="column" spacing={3}>
              <TextField
                required
                id="outlined-required-username"
                label="Username"
                variant="standard"
              />
              <TextField
                required
                id="outlined-required-email"
                label="Email"
                variant="standard"
              />
              <TextField
                required
                id="outlined-required-re-email"
                label="Re-Email"
                variant="standard"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birthday*"
                  slotProps={{ textField: { variant: "standard" } }}
                />
              </LocalizationProvider>

              <Button variant="contained" color="success" size="large">
                Register
              </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </>
    );
  }
}
