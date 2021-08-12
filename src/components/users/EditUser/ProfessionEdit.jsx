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
import Occupation from "../../../data/OccupationList";
import { getInitialValues } from "../../../utils/form";
import FormAutoComplete from "../../Form/FormAutoComplete";
import Income from "../../../data/Income";
import WorkTypes from "../../../data/WorkTypes";
const Schema = {
  occupation: Joi.string().max(255),
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
};

const validationSchema = Joi.object().keys(Schema);

export default function ProfessionEdit({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const profession = userDetails.profession;

  const initialValues = getInitialValues(Schema, profession);

  const onSubmit = (values) => {
    UpdateDetails("profession", { ...profession, ...values });
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.PROFESSION ? true : false}
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
                <FormAutoComplete
                  name="occupation"
                  label="Occupation"
                  items={Occupation}
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
