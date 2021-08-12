import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Joi from "joi-browser";

import BooleanData from "../../../data/BooleanData";
import Caste from "../../../data/Caste";
import Form from "../../Form/Form";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import FormSubmitButton from "../../Form/FormSubmitButton";
import MotherTongue from "../../../data/MotherTongue";
import Religion from "../../../data/Religion";
import FormAutoComplete from "../../Form/FormAutoComplete";
import AddUserContext from "../../../hooks/AddUserContext";
import BackButton from "./BackButton";

const validationSchema = Joi.object().keys({
  religion: Joi.string().required(),
  caste: Joi.string().required(),
  mother_tongue: Joi.string().default("hindi"),
  gotra: Joi.string().allow(""),
  dosh: Joi.string().allow(""),
  community_boundry: Joi.boolean().default(false),
});

const initialValues = {
  religion: "hindu",
  caste: "",
  mother_tongue: "hindi",
  gotra: "",
  dosh: "",
  community_boundry: false,
};

export default function Doctrine({ Steps, setStep, previousStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  const handleSubmit = ({ community_boundry, ...values }) => {
    const userDetails = UserDetails;
    if (userDetails.meta) {
      userDetails.meta.community_boundry = community_boundry;
    } else {
      userDetails.meta = { community_boundry };
    }
    userDetails.doctrine = values;
    setUserDetails(userDetails);
    setStep(Steps.FAMILY);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
            <BackButton onClick={previousStep} />
            <FormSubmitButton label="Next" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
