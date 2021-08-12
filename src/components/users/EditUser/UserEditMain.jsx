import React, { useContext } from "react";
import AppereanceEdit from "./AppereanceEdit";
import DoctrineEdit from "./DoctrineEdit";
import EditBasic from "./EditBasic";
import EducationEdit from "./EducationEdit";
import LifeStyleEdit from "./LifeStyleEdit";
import ProfessionEdit from "./ProfessionEdit";
import FamilyEdit from "./FamilyEdit";
import AddressEdit from "./AddressEdit";
import { UserEditSteps } from "./UserEditStep";
import ContactEdit from "./ContactEdit";
import UserDetailsContext from "../../../Context/UserDetailsContext";
import Swal from "sweetalert2";
import { UpdateUserDetails } from "../../../apis/user";
const GetDialog = (props) => {
  switch (props.name) {
    case UserEditSteps.BASIC:
      return <EditBasic {...props} />;
    case UserEditSteps.APPEARANCE:
      return <AppereanceEdit {...props} />;
    case UserEditSteps.DOCTORINE:
      return <DoctrineEdit {...props} />;
    case UserEditSteps.PROFESSION:
      return <ProfessionEdit {...props} />;
    case UserEditSteps.EDUCATION:
      return <EducationEdit {...props} />;
    case UserEditSteps.LIFESTYLE:
      return <LifeStyleEdit {...props} />;
    case UserEditSteps.FAMILY:
      return <FamilyEdit {...props} />;
    case UserEditSteps.CONTACT:
      return <ContactEdit {...props} />;
    case UserEditSteps.ADDRESS:
      return <AddressEdit {...props} />;
    default:
      <div></div>;
  }
};

export default function UserEditMain({ user, name, setName }) {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const UpdateDetails = async (label, values) => {
    const value = {};
    value[label] = values;
    const newObject = Object.assign(userDetails, value);
    setUserDetails(newObject);
    //Closing Dialog
    const response = await UpdateUserDetails(user, label, value);
    if (response.ok) {
      setName("");
      await Swal.fire("Success!", "User Updated Successfully!", "success");
    } else {
      setName("");
      await Swal.fire(response.problem, response.data.message, "error");
    }
  };
  return <div>{GetDialog({ UpdateDetails, name, setName })}</div>;
}
