import React, { useContext } from "react";
import AlertDialog from "../../common/DialogComponent";
import UserDetailsContext from "../../../Context/UserDetailsContext";
import Joi from "joi-browser";

import Form from "../../Form/Form";
import { Button, Grid } from "@material-ui/core";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import FormDatePicker from "../../Form/FormDatePicker";
import ProfileFor from "../../../data/ProfileFor";
import MaritalStatus from "../../../data/MaritalStatus";
import AddUserContext from "../../../Context/AddUserContext";
import { UserEditSteps } from "./UserEditStep";

const Gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function EditBasic({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const basic = userDetails.basic;
  const initialValues = {
    marital_status: basic.marital_status ? basic.marital_status : "",
    first_name: basic.first_name ? basic.first_name : "",
    last_name: basic.last_name ? basic.last_name : "",
    date_of_birth: basic.date_of_birth ? basic.date_of_birth : Date.now(),
    gender: basic.gender ? basic.gender : "",
  };
  const validationSchema = Joi.object().keys({
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
  const onSubmit = (values) => {
    UpdateDetails("basic", { ...basic, ...values });
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.BASIC ? true : false}
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
