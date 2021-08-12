import React, { useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import Joi from "joi-browser";

import Form from "../../Form/Form";
import FormField from "../../Form/FormField";
import FormSubmitButton from "../../Form/FormSubmitButton";
import UserDetailsContext from "../../../Context/UserDetailsContext";
import { UserEditSteps } from "./UserEditStep";
import AlertDialog from "../../common/DialogComponent";
import { getInitialValues } from "../../../utils/form";
const Schema = {
  country_code: Joi.number().default(91),
  phone: Joi.string().length(10).required(),
  email: Joi.string().email().allow(""),
};

const validationSchema = Joi.object().keys(Schema);

export default function ContactEdit({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const contact = userDetails.contact;

  const initialValues = getInitialValues(Schema, contact);

  const onSubmit = (values) => {
    UpdateDetails("contact", values);
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.CONTACT ? true : false}
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
                <FormField name="country_code" label="Country Code" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormField name="phone" label="Phone" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormField name="email" label="Email" />
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
