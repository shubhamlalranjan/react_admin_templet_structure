import React, { useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import Joi from "joi-browser";

import Form from "../../Form/Form";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import UserDetailsContext from "../../../Context/UserDetailsContext";
import { UserEditSteps } from "./UserEditStep";
import AlertDialog from "../../common/DialogComponent";
import { getInitialValues } from "../../../utils/form";
import FormAutoComplete from "../../Form/FormAutoComplete";
import EducationLevelList from "../../../data/EducationLevelList";
import Education from "../../../data/Education";

const Schema = {
  education: Joi.string().allow(""),
  education_level: Joi.string().required(),
  education_stream: Joi.string().allow(""),
  education_alias: Joi.string().allow(""),
  education_field: Joi.string().allow(""),
  college: Joi.string().allow(""),
};

const validationSchema = Joi.object().keys(Schema);

export default function EducationEdit({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const education = userDetails.education;

  const initialValues = getInitialValues(Schema, education);

  const onSubmit = (values) => {
    UpdateDetails("education", { ...education, ...values });
    //For Local
    const newObject = Object.assign(userDetails, {
      education: { ...education, ...values },
    });
    setUserDetails(newObject);
    //Closing Dialog
    setName("");
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.EDUCATION ? true : false}
      handleClose={() => {}}
      DialogContainer={() => (
        <>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
                  <FormSubmitButton label="Next" />
                </div>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    />
  );
}
