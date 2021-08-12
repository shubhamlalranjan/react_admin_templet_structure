import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Joi from "joi-browser";

import BodyType from "../../../data/BodyType";
import Complexion from "../../../data/Complexion";
import Form from "../../Form/Form";
import FormField from "../../Form/FormField";
import FormSelect from "../../Form/FormSelect";
import Height from "../../../data/Height";
import FormSubmitButton from "../../Form/FormSubmitButton";
import AddUserContext from "../../../hooks/AddUserContext";
import BackButton from "./BackButton";

const validationSchema = Joi.object().keys({
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
  phone: Joi.number().min(1000000000).max(9999999999).required(),
});
const initialValues = {
  height: "163",
  complexion: "very fair",
  body_type: "athletic",
  phone: "6206423013",
};
export default function ApperenceAndContact({ Steps, setStep, previousStep }) {
  const { UserDetails, setUserDetails } = useContext(AddUserContext);
  const handleSubmit = ({ phone, ...other }) => {
    const userDetails = UserDetails;
    userDetails.contact = { phone };
    userDetails.appearance = { ...other };
    setUserDetails(userDetails);
    setStep(Steps.EDUCATION);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <FormSelect label="Height" name="height" items={Height} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormSelect label="Complexion" name="complexion" items={Complexion} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormSelect label="Body" name="body_type" items={BodyType} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormField label="Phone" name="phone" InputPropElement="+91" />
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
