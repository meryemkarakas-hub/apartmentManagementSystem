import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  

  

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
      
      const requestData = new FormData();
      requestData.append("profilePhoto", uploadedFile); 

      await axios.post("http://localhost:8080/api/user/profile", requestData, {
        headers: {
          "Content-Type": "multipart/form-data", 
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
