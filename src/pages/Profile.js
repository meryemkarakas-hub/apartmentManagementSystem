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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/jpg, image/png",
    multiple: false,
    onDrop,
  });

  const saveProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", uploadedFile);
      formData.append("city", selectedCity);
      formData.append("phoneNumber", phoneNumber);

      await axios.post("http://localhost:8080/api/user/profile", formData);

      console.log("Profile data saved successfully!");
    } catch (error) {
      console.error("Error while saving profile data:", error);
    }
  };

  return (
    <div>
      <Typography variant="h5" color="black" style={{ fontWeight: "bold", marginBottom: "20px" }}>
        PROFİLİM
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          width: "175px",
          height: "175px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          cursor: "pointer",
          marginLeft: "0",
          marginRight: "auto",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        <input {...getInputProps()} />
        {uploadedFile ? (
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">
            {isDragActive ? "Dosyayı bırakın..." : "Resmi sürükleyin veya tıklayın"}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setUploadedFile(null)}
          style={{ width: "175px", backgroundColor: "green", marginBottom: "10px" }}
        >
          FOTOĞRAFI KALDIR
        </Button>
        <FormControl sx={{ minWidth: 120, width: "250px", marginBottom: "10px" }}>
          <InputLabel id="demo-simple-select-helper-label">Yaşanılan Şehir</InputLabel>
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
              <em>None</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.ad}>
                {city.ad}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Telefon Numarası"
          variant="outlined"
          style={{ width: "250px", marginBottom: "10px" }}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
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
