import React, { useContext } from "react";
import FormContext from "./FormContext";
import { InputAdornment, TextField } from "@material-ui/core";
export default function FormField({
  name,
  label,
  variant = "outlined",
  InputPropElement = "",
  InputPropPosition = "start",
}) {
  const Form = useContext(FormContext);
  const { values, setFieldValue, errors, setFieldTouched, touched } = Form;
  const error = errors[name] ? (touched[name] ? true : false) : false;
  return (
    <TextField
      error={error}
      name={name}
      label={label}
      defaultValue={values[name]}
      helperText={error ? errors[name] : ""}
      variant={variant}
      size='small'
      fullWidth={true}
      onBlur={() => setFieldTouched(name, true)}
      onChange={(e) => {
        const value = e.target.value;
        setFieldValue(name, value);
      }}
      InputProps={
        InputPropElement
          ? {
              startAdornment: (
                <InputAdornment position={InputPropPosition}>
                  {InputPropElement}
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
}
