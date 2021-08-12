import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Joi from "joi-browser";

import Education from "../../../data/Education";
import Form from "../../Form/Form";
import FormField from "../../Form/FormField";
import FormAutoComplete from "../../Form/FormAutoComplete";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import AddUserContext from "../../../hooks/AddUserContext";
import EducationLevelList from "../../../data/EducationLevelList";
import BackButton from "./BackButton";

const initialValues = {
  education: "",
  education_stream: "",
  education_alias: "",
  education_field: "",
  college: "",
  education_level: "",
};
const validationSchema = Joi.object().keys({
  education: Joi.string().allow(""),
  education_level: Joi.string().required(),
  education_stream: Joi.string().allow(""),
  education_alias: Joi.string().allow(""),
  education_field: Joi.string().allow(""),
  college: Joi.string().allow(""),
});

export default function Educations({ Steps, setStep, previousStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  const handleSubmit = (values) => {
    const userDetails = UserDetails;
    userDetails.education = values;
    setUserDetails(userDetails);
    setStep(Steps.PROFESSION);
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
            name="education_level"
            label="Education Level"
            items={EducationLevelList}
          />
        </Grid>
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
          <FormField name="college" label="College" />
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
