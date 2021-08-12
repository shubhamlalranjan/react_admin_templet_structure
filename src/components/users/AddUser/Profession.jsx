import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Joi from "joi-browser";

import Form from "../../Form/Form";
import FormAutoComplete from "../../Form/FormAutoComplete";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import Income from "../../../data/Income";
import Occupation from "../../../data/OccupationList";
import WorkType from "../../../data/WorkTypes";
import AddUserContext from "../../../hooks/AddUserContext";
import BackButton from "./BackButton";

const initialValues = {
  occupation: "",
  working_with: "",
  organization: "",
  income: "",
};

const validationSchema = Joi.object().keys({
  occupation: Joi.string().max(255),
  working_with: Joi.string()
    .valid(
      "private company",
      "government / public sector",
      "defense / civil services",
      "business / self employed",
      "non working"
    )
    .required(),
  organization: Joi.string().allow(""),
  income: Joi.string().allow(""),
});

export default function Profession({ Steps, setStep, previousStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  console.log("userDetails", UserDetails);
  const handleSubmit = (values) => {
    const userDetails = UserDetails;
    userDetails.profession = values;
    setUserDetails(userDetails);
    setStep(Steps.DOCTRINE);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormAutoComplete
            name="occupation"
            label="Occupation"
            items={Occupation}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormSelect name="working_with" label="Work Type" items={WorkType} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormField name="organization" label="Organization" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormSelect name="income" label="Income" items={Income} />
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BackButton onClick={previousStep} />
            <FormSubmitButton label="Next" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
