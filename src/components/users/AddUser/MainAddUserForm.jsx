import React from "react";

import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import Joi from "joi-browser";
import { PageHeader } from "../../../Common/Components";
// COUSTOME FILES
import AddUserContext from "../../../hooks/AddUserContext";
import Form from "../../Form/Form";
import FormAutoComplete from "../../Form/FormAutoComplete";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import FormDatePicker from "../../Form/FormDatePicker";
import FormSubmitButton from "../../Form/FormSubmitButton";
// DATA IMPORTS
import BodyType from "../../../data/BodyType";
import Caste from "../../../data/Caste";
import Complexion from "../../../data/Complexion";
import Dite, { Smoke, Drink } from "../../../data/Dite";
import Education from "../../../data/Education";
import Height from "../../../data/Height";
import MaritalStatus from "../../../data/MaritalStatus";
import MotherTongue from "../../../data/MotherTongue";
import Occupations from "../../../data/OccupationList";
import ProfileFor from "../../../data/ProfileFor";
import ParentStatus from "../../../data/ParentStatus";
import Religion from "../../../data/Religion";
import WorkTypes from "../../../data/WorkTypes";
import Income from "../../../data/Income";
import FormHeader from "../../Form/FormHeader";
const Gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const initialValues = {
  profile_for: "relative",
  working_country: "",
  working_state: "",
  working_district: "",
  working_city: "",
  working_zip_code: "",
  working_lane_1: "",
  working_lane_2: "",
  native_country: "",
  native_state: "",
  native_district: "",
  native_city: "",
  native_zip_code: "",
  native_lane_1: "",
  native_lane_2: "",
  height: "",
  complexion: "fair",
  body_type: "",
  marital_status: "never married",
  first_name: "",
  last_name: "",
  date_of_birth: new Date(),
  gender: "",

  country_code: 91,
  phone: "",
  religion: "",
  caste: "",
  mother_tongue: "hindi",
  gotra: "",
  dosh: "",
  education: "",
  education_stream: "",
  education_alias: "",
  education_field: "",
  college: "",
  brothers: 0,
  brothers_married: 0,
  father_name: "",
  father_profession: "",
  located: "",
  mother_name: "",
  mother_profession: "",
  no_of_kids: 0,
  sisters: 0,
  sisters_married: 0,
  dite: "veg",
  drinking: "no",
  smokeing: "no",
  community_boundry: true,
  lives_with_family: true,
  occupation: "",
  working_with: "non working",
  organization: "",
  income: "",
};

const validationSchema = Joi.object().keys({
  profile_for: Joi.string()
    .valid("self", "son", "daughter", "brother", "sister", "friend", "relative")
    .default("relative"),
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
  height: Joi.number().min(100),
  complexion: Joi.string()
    .valid(
      "very fair",
      "fair",
      "wheatish",
      "wheatish medium",
      "wheatish brown",
      "dark"
    )
    .required(),
  body_type: Joi.string().required(),
  marital_status: Joi.string()
    .valid(
      "never married",
      "divorced",
      "widowed",
      "awating divorced",
      "annulled"
    )
    .default("never married"),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().valid("male", "female").required(),

  country_code: Joi.number().default(91),
  phone: Joi.string().length(10).required(),
  religion: Joi.string().required(),
  caste: Joi.string().required(),
  mother_tongue: Joi.string().default("hindi"),
  gotra: Joi.string().allow(""),
  dosh: Joi.string().allow(""),
  education: Joi.string().allow(""),
  education_stream: Joi.string().allow(""),
  education_alias: Joi.string().allow(""),
  education_field: Joi.string().allow(""),
  college: Joi.string().allow(""),
  brothers: Joi.number().default(0),
  brothers_married: Joi.number().default(0),
  father_name: Joi.string().allow(""),
  father_profession: Joi.string().allow(""),
  located: Joi.string().allow(""),
  mother_name: Joi.string().allow(""),
  mother_profession: Joi.string().allow(""),
  no_of_kids: Joi.number().default(0),
  sisters: Joi.number().default(0),
  sisters_married: Joi.number().default(0),
  dite: Joi.string()
    .valid("veg", "non-veg", "occasionally non-veg", "jain", "vegan")
    .required(),
  drinking: Joi.string().valid("yes", "no", "occasionally").required(),
  smokeing: Joi.string().valid("yes", "no", "occasionally").required(),
  community_boundry: Joi.boolean().default(true),
  lives_with_family: Joi.boolean().default(true),
  occupation: Joi.string(),
  working_with: Joi.string()
    .valid(
      "private company ",
      "government / public sector",
      "defense / civil services",
      "business / self employed",
      "non working"
    )
    .required(),
  organization: Joi.string().allow(""),
  income: Joi.string().allow(""),
});

export default function MainAddUserForm() {
  const handleSubmit = () => {};
  return (
    <Box mt={2}>
      <PageHeader label="Add User" title="Blog Posts" />
      <Card>
        <CardContent>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <FormHeader>Basic</FormHeader>
              <Grid item xs={12} sm={4}>
                <FormSelect
                  name="profile_for"
                  label="Profile For"
                  items={ProfileFor}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField name="first_name" label="First Name" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField name="last_name" label="Last Name" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormDatePicker name="date_of_birth" label="Date Of Birth" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect name="gender" label="Gender" items={Gender} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect
                  name="marital_status"
                  label="Marital Status"
                  items={MaritalStatus}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <FormHeader>Contact And Apperence </FormHeader>
              <Grid item xs={12} sm={5}>
                <FormField label="Phone" name="phone" InputPropElement="+91" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormSelect label="Height" name="height" items={Height} />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormSelect
                  label="Complexion"
                  name="complexion"
                  items={Complexion}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormSelect label="Body" name="body_type" items={BodyType} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <FormHeader>Education</FormHeader>
              <Grid item xs={12} sm={4}>
                <FormAutoComplete
                  name="education"
                  label="Education"
                  items={Education}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField name="education_alias" label="Education Alias" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField name="education_field" label="Education Field" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField name="collage" label="College" />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <FormHeader>Profession</FormHeader>
              <Grid item xs={12} sm={4}>
                <FormAutoComplete
                  name="occupation"
                  label="Occupation"
                  items={Occupations}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect
                  name="working_with"
                  label="Work Type"
                  items={WorkTypes}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField name="organization" label="Organization" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect name="income" label="Income" items={Income} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <FormHeader>Family Details</FormHeader>
              <Grid item xs={12} sm={2}>
                <FormField name="no_of_kids" label="N.O of Kids(If Married)" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormField name="brothers" label="N.O of Brothers" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormField name="brothers_married" label="Brothers Married" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormField name="sisters" label="N.O of Sisters" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormField name="sisters_married" label="Sisters Married" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormField name="father_name" label="Father Name" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormSelect
                  name="father_profession"
                  label="Father profession"
                  items={ParentStatus}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormField name="mother_name" label="Mother Name" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormSelect
                  name="mother_profession"
                  label="Mother profession"
                  items={ParentStatus}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <FormHeader>Lifestyle</FormHeader>
              <Grid item xs={12} sm={4}>
                <FormSelect name="dite" label="Dite Type" items={Dite} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect name="drinking" label="Drink" items={Drink} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect name="smokeing" label="Smoke" items={Smoke} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <FormHeader>Address</FormHeader>
              <Grid item xs={12}></Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormSubmitButton label="Submit" />
                </div>
              </Grid>
            </Grid>
          </Form>
        </CardContent>
      </Card>
    </Box>
  );
}
