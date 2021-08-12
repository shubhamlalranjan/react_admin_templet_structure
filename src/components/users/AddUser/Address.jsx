import React, { useContext, useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import Joi from "joi-browser";
import Swal from "sweetalert2";

import Form from "../../Form/Form";
import FormAutoComplete from "../../Form/FormAutoComplete";
import FormField from "../../Form/FormField";
import FormSubmitButton from "../../Form/FormSubmitButton";
import AddUserContext from "../../../hooks/AddUserContext";
import FormContext from "../../Form/FormContext";
import { ParseAddressForm } from "../../../utils/adduser";
import BackButton from "./BackButton";
import { AddUserApi } from "../../../apis/user";
import {
  getStatesOfCountry,
  getCountries,
  getCitiesOfCountry,
} from "../../../apis/countryApi";

const initialValues = {
  working_country: "",
  working_state: "",
  working_city: "",
  working_district: "",
  working_zip_code: "",
  working_lane_1: "",
  working_lane_2: "",
  native_country: "India",
  native_state: "Bihar",
  native_district: "Patna",
  native_city: "",
  native_zip_code: "800009",
  native_lane_1: "",
  native_lane_2: "",
};

const validationSchema = Joi.object().keys({
  working_country: Joi.string().allow(""),
  working_state: Joi.string().allow(""),
  working_district: Joi.string().allow(""),
  working_city: Joi.string().allow(""),
  working_zip_code: Joi.string().allow(""),
  working_lane_1: Joi.string().allow(""),
  working_lane_2: Joi.string().allow(""),
  native_country: Joi.string().required(),
  native_state: Joi.string().required(),
  native_district: Joi.string().required(),
  native_city: Joi.string().required(),
  native_zip_code: Joi.string().allow("").length(6),
  native_lane_1: Joi.string().allow(""),
  native_lane_2: Joi.string().allow(""),
});

export const FormCheckForSameAddress = ({ label, onChange }) => {
  const { setFieldValue, values } = useContext(FormContext);
  const [Checked, setChecked] = useState(false);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={Checked}
          onChange={(e) => {
            const value = e.target.checked;
            if (value) {
              const n_district = values["native_district"];
              const n_city = values["native_city"];
              const n_country = values["native_country"];
              const n_state = values["native_state"];
              const n_zip_code = values["native_zip_code"];
              const n_lane_1 = values["native_lane_1"];
              setFieldValue("working_country", n_country);
              setFieldValue("working_state", n_state);
              setFieldValue("working_district", n_district);
              setFieldValue("working_city", n_city);
              setFieldValue("working_zip_code", n_zip_code);
              setFieldValue("working_lane_1", n_lane_1);
            }
            onChange(value);
            setChecked(value);
          }}
        />
      }
      label={label}
    />
  );
};

export default function Address({ Steps, setStep, previousStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  const handleSubmit = async (values) => {
    const userDetails = UserDetails;
    userDetails.address = ParseAddressForm(values);
    console.log(userDetails);
    setUserDetails(userDetails);
    const response = await AddUserApi(UserDetails);
    if (response.ok) {
      console.log("Success", response);
      const data = await Swal.fire(
        "Success!",
        "User Added Successfully!",
        "success"
      );
      if (data.isConfirmed) {
        // Redirect to user Details Page
      }
      console.log("Data", data);
    } else {
      console.log("error", response);
      const data = await Swal.fire(
        response.problem,
        "Error While Adding User!",
        "error"
      );
    }
  };
  const [CountryList, setCountryList] = useState([]);
  const [NativeStateList, setNativeStateList] = useState([]);
  const [NativeCities, setNativeCities] = useState([]);

  const [WorkingStateList, setWorkingStateList] = useState([]);
  const [WorkingCities, setWorkingCities] = useState([]);
  const [sameAddress, setSameAddress] = useState(false);

  useEffect(() => {
    getCountries().then((data) => {
      setCountryList(data);
    });
  }, []);

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {/* Native Address */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <FormAutoComplete
            name="native_country"
            label="Country"
            items={CountryList}
            onSelect={(event, newValue, FormBag) => {
              console.log(newValue);
              if (newValue) {
                getStatesOfCountry(newValue.isoCode).then((data) => {
                  console.log("Data", data);
                  setNativeStateList(data);
                });
                FormBag.setFieldValue("native_country", newValue.name);
              }
            }}
            getOptionLabel={(option, items, FormBag) => {
              if (option.name) {
                return option.name;
              } else {
                const value = FormBag.values["native_country"];
                let Label = value;
                items.forEach((item) => {
                  if (
                    String(item.value).toLowerCase() ===
                    String(value).toLowerCase()
                  ) {
                    Label = item.name;
                    return Label;
                  }
                });
                return Label;
              }
            }}
            getOptionSelected={(option, FormBag) => {
              return option.name === FormBag.values["native_country"];
            }}
          />
        </Grid>
        {/*Native States */}
        <Grid item xs={12} sm={3}>
          <FormAutoComplete
            name="native_state"
            label="State"
            items={NativeStateList}
            onSelect={(event, newValue, FormBag) => {
              console.log(newValue);
              if (newValue) {
                FormBag.setFieldValue("native_state", newValue.name);

                getCitiesOfCountry(newValue.countryCode, newValue.isoCode).then(
                  (data) => {
                    setNativeCities(data);
                  }
                );
              }
            }}
            getOptionLabel={(option, items, FormBag) => {
              if (option.name) {
                return option.name;
              } else {
                const value = FormBag.values["native_state"];
                let Label = value;
                items.forEach((item) => {
                  if (
                    String(item.value).toLowerCase() ===
                    String(value).toLowerCase()
                  ) {
                    Label = item.name;
                    return Label;
                  }
                });
                return Label;
              }
            }}
            getOptionSelected={(option, FormBag) => {
              return option.name === FormBag.values["native_state"];
            }}
          />
        </Grid>

        {/*Native District */}
        <Grid item xs={12} sm={3}>
          <FormAutoComplete
            name="native_district"
            label="District"
            items={NativeCities}
            onSelect={(event, newValue, FormBag) => {
              console.log(newValue);
              FormBag.setFieldValue("native_district", newValue.name);
            }}
            getOptionLabel={(option, items, FormBag) => {
              if (option.name) {
                return option.name;
              } else {
                const value = FormBag.values["native_district"];
                let Label = value;
                items.forEach((item) => {
                  if (
                    String(item.value).toLowerCase() ===
                    String(value).toLowerCase()
                  ) {
                    Label = item.name;
                    return Label;
                  }
                });
                return Label;
              }
            }}
            getOptionSelected={(option, FormBag) => {
              return option.name === FormBag.values["native_district"];
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormField label="Zip Code" name="native_zip_code" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormField label="City" name="native_city" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField label="Lane 1" name="native_lane_1" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormField label="Lane 2" name="native_lane_2" />
        </Grid>
      </Grid>
      {/* Checkbox  */}
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ margin: "10px" }}>
          <FormCheckForSameAddress
            label="Working And Native Place are Same"
            onChange={(value) => {
              setWorkingStateList(NativeStateList);
              setWorkingCities(NativeCities);
              if (value) setSameAddress(value);
            }}
          />
        </Grid>
      </Grid>
      {/* Working Address */}
      <Grid container spacing={2}>
        {/*Working Country*/}
        <Grid item xs={12} sm={3}>
          <FormAutoComplete
            name="working_country"
            label="Country"
            items={CountryList}
            onSelect={(event, newValue, FormBag) => {
              if (newValue) {
                console.log(newValue);
                getStatesOfCountry(newValue.isoCode).then((data) => {
                  setWorkingStateList(data);
                });
                FormBag.setFieldValue("working_country", newValue.name);
              }
            }}
            getOptionLabel={(option, items, FormBag) => {
              if (option.name) {
                return option.name;
              } else {
                const value = FormBag.values["working_country"];
                let Label = value;
                items.forEach((item) => {
                  if (
                    String(item.value).toLowerCase() ===
                    String(value).toLowerCase()
                  ) {
                    Label = item.name;
                    return Label;
                  }
                });
                return Label;
              }
            }}
            getOptionSelected={(option, FormBag) => {
              return option.name === FormBag.values["working_country"];
            }}
          />
        </Grid>
        {/*Working State*/}
        <Grid item xs={12} sm={3}>
          <FormAutoComplete
            name="working_state"
            label="State"
            items={WorkingStateList}
            onSelect={(event, newValue, FormBag) => {
              if (newValue) {
                console.log(newValue);
                FormBag.setFieldValue("working_state", newValue.name);
                getCitiesOfCountry(newValue.countryCode, newValue.isoCode).then(
                  (data) => {
                    setWorkingCities(data);
                  }
                );
              }
            }}
            getOptionLabel={(option, items, FormBag) => {
              if (option.name) {
                return option.name;
              } else {
                const value = FormBag.values["working_state"];
                let Label = value;
                items.forEach((item) => {
                  if (
                    String(item.value).toLowerCase() ===
                    String(value).toLowerCase()
                  ) {
                    Label = item.name;
                    return Label;
                  }
                });
                return Label;
              }
            }}
            getOptionSelected={(option, FormBag) => {
              return option.name === FormBag.values["working_state"];
            }}
          />
        </Grid>

        {/*Working District*/}
        <Grid item xs={12} sm={3}>
          <FormAutoComplete
            name="working_district"
            label="District"
            items={WorkingCities}
            onSelect={(event, newValue, FormBag) => {
              console.log(newValue);
              FormBag.setFieldValue("working_district", newValue.name);
            }}
            getOptionLabel={(option, items, FormBag) => {
              if (option.name) {
                return option.name;
              } else {
                const value = FormBag.values["working_district"];
                let Label = value;
                items.forEach((item) => {
                  if (
                    String(item.value).toLowerCase() ===
                    String(value).toLowerCase()
                  ) {
                    Label = item.name;
                    return Label;
                  }
                });
                return Label;
              }
            }}
            getOptionSelected={(option, FormBag) => {
              return option.name === FormBag.values["working_district"];
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormField label="Zip Code" name="working_zip_code" />
        </Grid>
      </Grid>
      {/* Submit Button */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BackButton onClick={previousStep} />
            <FormSubmitButton label="Finish" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
