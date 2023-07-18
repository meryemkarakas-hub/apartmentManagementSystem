import React, { Component } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../App.css";

export default class Register extends Component {
  render() {
    return (
      <div className="register-container">
        <Box className="box-container">
          <Paper className="box-item" elevation={3}>
            <h1 className="register-heading">REGISTER</h1>
            <div className="text-fields-container">
              <TextField
                required
                id="outlined-required-username"
                label="Username"
                variant="standard"
                className="text-field custom-width"
              />
              <TextField
                required
                id="outlined-required-email"
                label="Email"
                variant="standard"
                className="text-field custom-width"
              />
              <TextField
                required
                id="outlined-required-re-email"
                label="Re-Email"
                variant="standard"
                className="text-field custom-width"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Birthday*"
                    className="text-field custom-width"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <Button variant="contained" className="register-button">
              Register
            </Button>
          </Paper>
        </Box>
      </div>
    );
  }
}
