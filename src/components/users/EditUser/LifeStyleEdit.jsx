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
import Dite, { Drink, Smoke } from "../../../data/Dite";
const Schema = {
  dite: Joi.string()
    .valid("vegetarian", "jain", "eggetarian", "non vegetarian")
    .required(),
  drinking: Joi.string().valid("yes", "no", "occasionally").required(),
  smokeing: Joi.string().valid("yes", "no", "occasionally").required(),
};

const validationSchema = Joi.object().keys(Schema);

export default function LifeStyleEdit({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const lifestyle = userDetails.lifestyle;

  const initialValues = getInitialValues(Schema, lifestyle);

  const onSubmit = (values) => {
    UpdateDetails("lifestyle", { ...lifestyle, ...values });
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.LIFESTYLE ? true : false}
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
