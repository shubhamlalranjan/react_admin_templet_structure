import React, { useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import Joi from "joi-browser";
import Swal from "sweetalert2";

import BodyType from "../../../data/BodyType";
import Complexion from "../../../data/Complexion";
import Form from "../../Form/Form";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import Height from "../../../data/Height";
import FormSubmitButton from "../../Form/FormSubmitButton";
import UserDetailsContext from "../../../Context/UserDetailsContext";
import { UserEditSteps } from "./UserEditStep";
import AlertDialog from "../../common/DialogComponent";
import { getInitialValues } from "../../../utils/form";

const Schema = {
  height: Joi.number().min(100),
  complexion: Joi.string()
    .valid(
      "very fair",
      "fair",
      "wheatish",
      "wheatish medium",
      "wheatish brown",
      "dark"
    )
    .required(),
  body_type: Joi.string().required(),
};
const validationSchema = Joi.object().keys(Schema);

export default function AppereanceEdit({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const appearance = userDetails.appearance;

  const initialValues = getInitialValues(Schema, appearance);

  const onSubmit = async (values) => {
    UpdateDetails("appearance", values);
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.APPEARANCE ? true : false}
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
                <FormSelect label="Height" name="height" items={Height} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect
                  label="Complexion"
                  name="complexion"
                  items={Complexion}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect label="Body" name="body_type" items={BodyType} />
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
