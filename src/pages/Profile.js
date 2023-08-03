import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import axios from "axios";

const Profile = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const inputMaskRef = useRef(null);

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
      if (!selectedCity) {
        console.error("Şehir seçmediniz!");
        return;
      }

      const requestData = new FormData();
      requestData.append("city", selectedCity.cityName);
      requestData.append("cityId", selectedCity.id);
      requestData.append("phoneNumber", phoneNumber);
      requestData.append("profilePhoto", uploadedFile); // Add the uploaded photo to the formData

      await axios.post("http://localhost:8080/api/user/profile", requestData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct Content-Type for formData
        },
      });

      console.log("Profile data saved successfully!");
    } catch (error) {
      console.error("Error while saving profile data:", error);
    }
  };

  const TextMaskCustom = React.forwardRef((props, ref) => {
    const { mask, ...other } = props;

    return (
      <InputMask
        {...other}
        mask={mask}
        guide={false}
        placeholderChar={'\u2000'}
        showMask
        ref={ref}
      />
    );
  });

  const phoneMask = "(999) 999-9999";

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
            {isDragActive
              ? "Dosyayı bırakın..."
              : "Resmi sürükleyin veya tıklayın"}
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
          style={{
            width: "175px",
            backgroundColor: "green",
            marginBottom: "10px",
          }}
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
              <em>Seçimi temizle</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city}>
                {city.cityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Telefon Numarası"
          variant="outlined"
          InputProps={{
            inputComponent: (props) => <TextMaskCustom {...props} mask={phoneMask} />,
            inputProps: {
              ref: inputMaskRef,
              value: phoneNumber, // Set the value from the state
              onChange: (e) => setPhoneNumber(e.target.value), // Handle changes and update state
            },
          }}
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
