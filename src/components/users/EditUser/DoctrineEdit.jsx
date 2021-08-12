import React, { useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import Joi from "joi-browser";

import BooleanData from "../../../data/BooleanData";
import Caste from "../../../data/Caste";
import Form from "../../Form/Form";
import FormAutoComplete from "../../Form/FormAutoComplete";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import MotherTongue from "../../../data/MotherTongue";
import Religion from "../../../data/Religion";

import UserDetailsContext from "../../../Context/UserDetailsContext";
import { UserEditSteps } from "./UserEditStep";
import AlertDialog from "../../common/DialogComponent";
import { getInitialValues } from "../../../utils/form";

const Schema = {
  religion: Joi.string().required(),
  caste: Joi.string().required(),
  mother_tongue: Joi.string().default("hindi"),
  gotra: Joi.string().allow(""),
  dosh: Joi.string().allow(""),
  community_boundry: Joi.boolean().default(false),
};
const validationSchema = Joi.object().keys(Schema);

export default function DoctrineEdit({ UpdateDetails, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const doctrine = userDetails.doctrine;

  const initialValues = getInitialValues(Schema, doctrine);
  const onSubmit = (values) => {
    UpdateDetails("doctrine", { ...doctrine, ...values });
  };
  return (
    <AlertDialog
      open={name === UserEditSteps.DOCTORINE ? true : false}
      DialogContainer={() => (
        <>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormSelect name="religion" label="Religion" items={Religion} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormAutoComplete name="caste" label="Caste" items={Caste} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormSelect
                  name="mother_tongue"
                  label="Mother Tongue"
                  items={MotherTongue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="gotra" label="Gotra" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="dosh" label="Dosh" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormSelect
                  name="community_boundry"
                  label="Community Boundry"
                  items={BooleanData}
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
