import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const ImageUploadField = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    multiple: false,
    onDrop,
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      }}
    >
      <Typography variant="h5" color="black" style={{ fontWeight: 'bold' }}>
        PROFİLİM
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          width: '175px',
          height: '175px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          cursor: 'pointer',
          marginLeft: '0',
          marginRight: 'auto',
          border: '1px solid #ccc',
        }}
      >
        <input {...getInputProps()} />
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">
            {isDragActive ? 'Dosyayı bırakın...' : 'Resmi sürükleyin veya tıklayın'}
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setUploadedImage(null)}
        style={{ width: '175px', marginTop: '10px', backgroundColor: 'green' }}
      >
        FOTOĞRAFI KALDIR
      </Button>
      <FormControl sx={{ minWidth: 120, width: '250px', marginTop: '30px' }}>
        <InputLabel id="demo-simple-select-helper-label">Yaşanılan Şehir</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Yaşanılan Şehir"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Telefon Numarası"
        variant="outlined"
        style={{ width: '250px', marginTop: '30px' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => setUploadedImage(null)}
        style={{ width: '175px', marginTop: '30px', backgroundColor: 'green' }}
      >
        KAYDET
      </Button>
    </Box>
  );
};

export default ImageUploadField;
