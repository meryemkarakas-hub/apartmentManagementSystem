import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputMask from 'react-text-mask';

const PhoneNumberInput = () => {
  // Telefon numarası mask'ı (şablonu)
  const phoneMask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const inputMaskRef = useRef(null);

  return (
    <TextField
      label="Telefon Numarası"
      variant="outlined"
      InputProps={{
        inputComponent: (props) => <TextMaskCustom {...props} mask={phoneMask} />, // phoneMask'ı mask olarak geçiriyoruz
        inputProps: {
          ref: inputMaskRef, // InputMask bileşenini ref olarak yönlendiriyoruz
        },
      }}
    />
  );
};

const TextMaskCustom = React.forwardRef((props, ref) => {
  const { mask, ...other } = props; // mask prop'unu ayırıyoruz

  return (
    <InputMask
      {...other}
      mask={mask} // mask prop'unu mask olarak kullanıyoruz
      guide={false}
      placeholderChar={'\u2000'}
      showMask
      ref={ref} // ref'i doğrudan InputMask bileşenine yönlendiriyoruz
    />
  );
});

export default PhoneNumberInput;
