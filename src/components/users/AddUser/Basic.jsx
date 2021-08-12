import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Joi from "joi-browser";

import Form from "../../Form/Form";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import FormDatePicker from "../../Form/FormDatePicker";
import ProfileFor from "../../../data/ProfileFor";
import MaritalStatus from "../../../data/MaritalStatus";
import AddUserContext from "../../../hooks/AddUserContext";

const Gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
const validationSchema = Joi.object().keys({
  profile_for: Joi.string()
    .valid("self", "son", "daughter", "brother", "sister", "friend", "relative")
    .default("relative"),
  marital_status: Joi.string()
    .valid(
      "never married",
      "divorced",
      "widowed",
      "awaiting divorce",
      "annulled"
    )
    .default("never married")
    .required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.date().required().label("Date Of Birth"),
  gender: Joi.string().valid("male", "female").required(),
});
const initialValues = {
  profile_for: "relative",
  marital_status: "never married",
  first_name: "Shubham",
  last_name: "Lal",
  date_of_birth: new Date(),
  gender: "male",
};

export default function Basic({ Steps, setStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  const handleSubmit = ({ profile_for, ...other }) => {
    const userDetails = UserDetails;
    userDetails.account = { profile_for };
    userDetails.basic = { ...other };
    setUserDetails(userDetails);
    setStep(Steps.APPERENCE);
  };

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
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
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FormSubmitButton label="Next" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
