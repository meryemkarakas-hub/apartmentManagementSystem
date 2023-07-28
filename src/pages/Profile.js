import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography } from '@mui/material';

const ImageUploadField = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

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

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Box
          {...getRootProps()}
          sx={{
            width: '175px',
            height: '175px',
            display: 'flex',
            justifyContent: 'flex-start', // Align content (image) to the left
            alignItems: 'center',
            cursor: 'pointer',
            marginLeft: '0', // Set the left margin to 0 for alignment on the left side
            marginRight: 'auto', // Set the right margin to auto to center horizontally
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
        <Button variant="contained" color="primary" onClick={() => setUploadedImage(null)} style={{ width: '175px', marginTop: '10px', backgroundColor: 'green' }}>
          FOTOĞRAFI KALDIR
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadField;
