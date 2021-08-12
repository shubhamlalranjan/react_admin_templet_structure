import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Joi from "joi-browser";

import ParentStatus from "../../../data/ParentStatus";

import Form from "../../Form/Form";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import FormField from "../../Form/FormField";
import AddUserContext from "../../../hooks/AddUserContext";
import BackButton from "./BackButton";

const initialValues = {
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
};

const validationSchema = Joi.object().keys({
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
});

export default function FamilyDetails({ Steps, setStep, previousStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  const handleSubmit = (values) => {
    const userDetails = UserDetails;
    userDetails.family = values;
    setUserDetails(userDetails);
    setStep(Steps.LIFESTYLE);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
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
