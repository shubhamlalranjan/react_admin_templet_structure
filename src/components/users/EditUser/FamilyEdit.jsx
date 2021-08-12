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
import ParentStatus from "../../../data/ParentStatus";

const Schema = {
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
};

const validationSchema = Joi.object().keys(Schema);

export default function FamilyEdit({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const family = userDetails.family;

  const initialValues = getInitialValues(Schema, family);

  const onSubmit = (values) => {
    UpdateDetails("family", { ...family, ...values });
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.FAMILY ? true : false}
      handleClose={() => {}}
      DialogContainer={() => (
        <>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
                  <Button
                    onClick={() => {
                      setName("");
                    }}
                    style={{ margin: "0 20px" }}
                    color="secondary"
                    variant="contained"
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
