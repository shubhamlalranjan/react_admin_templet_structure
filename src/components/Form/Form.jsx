import React, { useState, useEffect } from "react";
import FormContext from "./FormContext";

export default function Form({
  children,
  validationSchema,
  initialValues,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForms();
  }, []);

  const validateForms = () => {
    const validationError = validationSchema.validate(values, {
      abortEarly: false,
    });
    console.log(validationError);
    if (validationError.error) {
      const {
        error: { details: error },
      } = validationError;
      const newErrors = {};
      error.forEach((field) => {
        const key = field.context.key;
        const message = field.message;
        newErrors[key] = message;
      });
      setIsValid(false);
      setErrors(newErrors);
    } else {
      setIsValid(true);
      setErrors({});
    }
  };

  const setFieldValue = (name, value) => {
    const newValues = values;
    newValues[name] = value;
    setValues(newValues);
    validateForms();
  };
  const setFieldTouched = (name, value = true) => {
    touched[name] = value;
    setTouched(touched);
    validateForms();
  };

  const setFieldError = (name, value) => {
    errors[name] = value;
    setErrors(errors);
  };
  const restFormValue = (Values = initialValues) => {
    setValues(Values);
    setErrors({});
    setTouched({});
    setIsValid(false);
  };
  const contextBag = {
    errors,
    isValid,
    restFormValue,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setErrors,
    touched,
    values,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length) {
      return console.log("Form Data Invalid");
    }
    onSubmit(values, contextBag);
  };

  return (
    <FormContext.Provider value={contextBag}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
}
