import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Joi from "joi-browser";

import Dite, { Drink, Smoke } from "../../../data/Dite";
import Form from "../../Form/Form";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import AddUserContext from "../../../hooks/AddUserContext";
import BackButton from "./BackButton";

const initialValues = {
  dite: "veg",
  drinking: "no",
  smokeing: "no",
};

const validationSchema = Joi.object().keys({
  dite: Joi.string()
    .valid("vegetarian", "jain", "eggetarian", "non vegetarian")
    .required(),
  drinking: Joi.string().valid("yes", "no", "occasionally").required(),
  smokeing: Joi.string().valid("yes", "no", "occasionally").required(),
});

export default function LifeStyle({ Steps, setStep, previousStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  const handleSubmit = (values) => {
    const userDetails = UserDetails;
    userDetails.lifestyle = values;
    setUserDetails(userDetails);
    setStep(Steps.ADDRESS);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormSelect name="dite" label="Dite Type" items={Dite} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormSelect name="drinking" label="Drink" items={Drink} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormSelect name="smokeing" label="Smoke" items={Smoke} />
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
