import { Box, Paper } from "@material-ui/core";
import React from "react";
import { ListTitle } from "../common/Components";
import { capitalizeFirstLetter } from "../../utils/string";
import EditIcon from "@material-ui/icons/Edit";

export default function DetailsBox({
  children,
  label = "Label",
  secondIcon = <EditIcon color="primary" />,
  onClick = () => {
    console.log("config secound Click Button");
  },
}) {
  return (
    <Paper elevation={1} component={Box} p={1} mb={2} mr={1}>
      <ListTitle
        label={capitalizeFirstLetter(label)}
        secondIcon={secondIcon}
        handleSecondButton={onClick}
      />
      {children}
    </Paper>
  );
}
