import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import FormAutoComplete from "../Form/FormAutoComplete";
import FormField from "../Form/FormField";
import Caste from "../../data/Caste";
import MaritalStatus from "../../data/MaritalStatus";
import FormSelect from "../Form/FormSelect";
import Height from "../../data/Height";
import EducationLevelList from "../../data/EducationLevelList";
import Complexion from "../../data/Complexion";
import BodyType from "../../data/BodyType";
import Income from "../../data/Income";
import Form from "../Form/Form";
import { CoustomButton } from "../common/Components";
import Joi from "joi-browser";
import AlertDialog from "../common/DialogComponent";

import { getStatesOfCountry, getCountries } from "../../apis/countryApi";

export const initialValues = {
  caste: "",
  min_height: 0,
  max_height: 0,
  min_age: 0,
  max_age: 0,
  body_type: "",
  complexion: "",
  marital_status: "",
  education_level: "",
  income: "",
  country: "India",
  state: "Bihar",
  district: "",
};

const validationSchema = Joi.object().keys({
  min_height: Joi.number().default(0),
  max_height: Joi.number().default(0),
  min_age: Joi.number().default(0),
  max_age: Joi.number().default(0),
  marital_status: Joi.string().allow(""),
  education_level: Joi.string().allow(""),
  caste: Joi.string().allow(""),
  body_type: Joi.string().allow(""),
  complexion: Joi.string().allow(""),
  income: Joi.string().allow(""),
  country: Joi.string().allow(""),
  state: Joi.string().allow(""),
  district: Joi.string().allow(""),
});

export function DialogContent({ handleFormSubmit, handleDialogClose }) {
  const [CountryList, setCountryList] = useState([]);
  const [States, setStates] = useState([]);
  useEffect(() => {
    getCountries().then((data) => {
      setCountryList(data);
    });
  }, []);
  return (
    <Box>
      <Box mb={2} mt={1}>
        <Typography variant="h6" color="textSecondary">
          {" "}
          Filter User
        </Typography>
        <Typography variant="subtitle2" color="primary">
          field value 0 means default and not aplicable for search.
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3}>
                <FormField name="min_age" label="Min Age" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormField name="max_age" label="Max Age" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormAutoComplete name="caste" label="Caste" items={Caste} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormSelect
                  name="marital_status"
                  label="Status"
                  items={MaritalStatus}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormSelect
                  name="min_height"
                  label="Min Height"
                  items={Height}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormSelect
                  name="max_height"
                  label="Max Height"
                  items={Height}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormAutoComplete
                  name="education_level"
                  label="Education"
                  items={EducationLevelList}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormAutoComplete
                  name="complexion"
                  label="Complexion"
                  items={Complexion}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormAutoComplete
                  name="body_type"
                  label="Body Type"
                  items={BodyType}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormAutoComplete name="income" label="Income" items={Income} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormAutoComplete
                  name="country"
                  label="Country"
                  items={CountryList}
                  onSelect={(event, newValue, FormBag) => {
                    if (newValue) {
                      console.log(newValue);
                      getStatesOfCountry(newValue.isoCode).then((data) => {
                        setStates(data);
                      });
                      FormBag.setFieldValue("country", newValue.name);
                    }
                  }}
                  getOptionLabel={(option, items, FormBag) => {
                    if (option.name) {
                      return option.name;
                    } else {
                      const value = FormBag.values["country"];
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
                    return option.name === FormBag.values["country"];
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormAutoComplete
                  name="state"
                  label="State"
                  items={States}
                  onSelect={(event, newValue, FormBag) => {
                    if (newValue) {
                      console.log(newValue);
                      FormBag.setFieldValue("state", newValue.name);
                    }
                  }}
                  getOptionLabel={(option, items, FormBag) => {
                    if (option.name) {
                      return option.name;
                    } else {
                      const value = FormBag.values["state"];
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
                    return option.name === FormBag.values["state"];
                  }}
                />
              </Grid>
            </Grid>

            {/* //form action */}
            <Typography align="right" style={{ margin: "32px 0px 16px 0px" }}>
              <CoustomButton
                label="cancel"
                variant="contained"
                color="default"
                onClick={handleDialogClose}
              />
              <CoustomButton
                label="Filter"
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "0px 10px" }}
              />
            </Typography>
          </Form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function UsersFilterForm({
  open,
  handleDialogClose,
  handleFormSubmit,
  setFormValue,
}) {
  return (
    <AlertDialog
      open={open}
      DialogContainer={() => (
        <DialogContent
          handleDialogClose={handleDialogClose}
          handleFormSubmit={handleFormSubmit}
        />
      )}
      handleClose={handleDialogClose}
    />
  );
}
