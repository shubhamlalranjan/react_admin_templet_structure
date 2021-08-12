import React, { useContext, useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import Joi from "joi-browser";

import Form from "../../Form/Form";
import FormAutoComplete from "../../Form/FormAutoComplete";
import FormField from "../../Form/FormField";
import FormSubmitButton from "../../Form/FormSubmitButton";
import UserDetailsContext from "../../../Context/UserDetailsContext";
import { UserEditSteps } from "./UserEditStep";
import AlertDialog from "../../common/DialogComponent";
import { getInitialValues } from "../../../utils/form";
import { AddressParserForForm, ParseAddressForm } from "../../../utils/adduser";
import { FormCheckForSameAddress } from "../AddUser/Address";
import {
  getStatesOfCountry,
  getCountries,
  getCitiesOfCountry,
} from "../../../apis/countryApi";

const Schema = {
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
};

const validationSchema = Joi.object().keys(Schema);

export default function AddressEdit({ UpdateDetails, name, setName }) {
  const [CountryList, setCountryList] = useState([]);
  const [NativeStateList, setNativeStateList] = useState([]);
  const [NativeCities, setNativeCities] = useState([]);

  const [WorkingStateList, setWorkingStateList] = useState([]);
  const [WorkingCities, setWorkingCities] = useState([]);
  const [sameAddress, setSameAddress] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const address = userDetails.address;

  const initialValues = getInitialValues(Schema, AddressParserForForm(address));

  useEffect(() => {
    getCountries().then((data) => {
      setCountryList(data);
    });
  }, []);

  const onSubmit = (values) => {
    UpdateDetails("address", ParseAddressForm(values));
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.ADDRESS ? true : false}
      handleClose={() => {}}
      DialogContainer={() => (
        <>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
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

              <Grid item xs={12} sm={3}>
                <FormAutoComplete
                  name="native_state"
                  label="State"
                  items={NativeStateList}
                  onSelect={(event, newValue, FormBag) => {
                    console.log(newValue);
                    if (newValue) {
                      FormBag.setFieldValue("native_state", newValue.name);

                      getCitiesOfCountry(
                        newValue.countryCode,
                        newValue.isoCode
                      ).then((data) => {
                        setNativeCities(data);
                      });
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

              <Grid item xs={12} sm={3}>
                <FormAutoComplete
                  name="working_state"
                  label="State"
                  items={WorkingStateList}
                  onSelect={(event, newValue, FormBag) => {
                    if (newValue) {
                      console.log(newValue);
                      FormBag.setFieldValue("working_state", newValue.name);
                      getCitiesOfCountry(
                        newValue.countryCode,
                        newValue.isoCode
                      ).then((data) => {
                        setWorkingCities(data);
                      });
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
                  <Button
                    onClick={() => {
                      setName("");
                    }}
                    color="secondary"
                    variant="contained"
                    style={{ margin: "0 20px" }}
                  >
                    Close
                  </Button>
                  <FormSubmitButton label="Submit" />
                </div>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    />
  );
}
