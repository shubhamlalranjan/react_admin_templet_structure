import React, { useState } from "react";
import { Box, Card, CardContent } from "@material-ui/core";
import { PageHeader } from "../../common/Components";

import AddUserContext from "../../../hooks/AddUserContext";

import Address from "./Address";
import Basic from "./Basic";
import ApperenceAndContact from "./ApperenceAndContact";
import Doctrine from "./Doctrine";
import FamilyDetails from "./FamilyDetails";
import Educations from "./Educations";
import Profession from "./Profession";
import LifeStyle from "./LifeStyle";

const Steps = {
  BASIC: "Basic Details", // done
  APPERENCE: "Apperence And Contact Detials", //done
  DOCTRINE: "Doctrine", //done
  EDUCATION: "Education Details",
  FAMILY: "Family Details",
  LIFESTYLE: "About Life Styles",
  META: "meta",
  ADDRESS: "Address Details",
  PROFESSION: "Profession",
};

export default function AddUser(props) {
  const [UserDetails, setUserDetails] = useState({});
  const [backStep, setBackStep] = useState(Steps.BASIC);
  const [Step, setStep] = useState(Steps.BASIC);

  const SetStep = (step) => {
    setBackStep(Step);
    setStep(step);
  };

  const previousStep = () => {
    setStep(backStep);
  };
  const Props = {
    Steps,
    setStep: SetStep,
    previousStep,
    ...props,
  };
  const getStepContent = () => {
    switch (Step) {
      case Steps.BASIC:
        return <Basic {...Props} />;
      case Steps.ADDRESS:
        return <Address {...Props} />;
      case Steps.APPERENCE:
        return <ApperenceAndContact {...Props} />;
      case Steps.DOCTRINE:
        return <Doctrine {...Props} />;
      case Steps.FAMILY:
        return <FamilyDetails {...Props} />;
      case Steps.EDUCATION:
        return <Educations {...Props} />;
      case Steps.LIFESTYLE:
        return <LifeStyle {...Props} />;
      case Steps.PROFESSION:
        return <Profession {...Props} />;
      default:
        <Basic {...Props} />;
      // code block
    }
  };

  return (
    <Box mt={2}>
      <PageHeader label="Add User" title={Step} />
      <Card>
        <AddUserContext.Provider value={{ UserDetails, setUserDetails }}>
          <CardContent>{getStepContent()}</CardContent>
        </AddUserContext.Provider>
      </Card>
    </Box>
  );
}
