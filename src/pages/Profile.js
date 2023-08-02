import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Profile = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); // Initially, it's null until the user selects a city

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/cities");
      const data = response.data;
      setCities(data);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const saveProfileData = async () => {
    try {
      if (!selectedCity) {
        console.error("Şehir seçmediniz!");
        return;
      }

      const requestData = {
        city: selectedCity.cityName, // Use the cityName from the selectedCity object
        cityId: selectedCity.id, // Use the id from the selectedCity object
      };

      await axios.post("http://localhost:8080/api/user/profile", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Profile data saved successfully!");
    } catch (error) {
      console.error("Error while saving profile data:", error);
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        color="black"
        style={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        PROFİLİM
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "20px",
        }}
      >
        <FormControl
          sx={{ minWidth: 120, width: "250px", marginBottom: "10px" }}
        >
          <InputLabel id="demo-simple-select-helper-label">
            Yaşanılan Şehir
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedCity}
            label="Yaşanılan Şehir"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <MenuItem value="">
              <em>Seçimi temizle</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city}>
                {city.cityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={saveProfileData}
          style={{ width: "175px", backgroundColor: "green" }}
        >
          KAYDET
        </Button>
      </Box>
    </div>
  );
};

export default Profile;
