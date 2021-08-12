import React from "react";

import Dashboard from "@material-ui/icons/Dashboard";
import PersonAdd from "@material-ui/icons/PersonAdd";
import People from "@material-ui/icons/People";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import useStyles from "../HeaderStyle";

const SideNavListData = [
  { icon: <PersonAdd />, label: "Add User", link: "/user/add" },
  { icon: <People />, label: "User", link: "/users" },
  { icon: <Dashboard />, label: "Dashboard", link: "/" },
];

export default function SideNavList({ handleDrawerToggle }) {
  const classes = useStyles();
  return (
    <List dense={true}>
      {SideNavListData.map((item, i) => (
        <Button
          key={i}
          size="small"
          onClick={() => handleDrawerToggle()}
          className={classes.navButton}
        >
          <ListItem
            exact
            key={i}
            component={NavLink}
            to={item.link}
            className={classes.navlink}
            activeClassName={classes.selectedNav}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
  );
}
// export default function SideNavList({ handleDrawerToggle }) {
//   return (
//     <List dense={true}>
//       {SideNavListData.map((list, i) => (
//         <ListItem key={i} component={NavLink} to={list.link}>
//           <ListItemIcon>{list.icon}</ListItemIcon>
//           <ListItemText>{list.label}</ListItemText>
//         </ListItem>
//       ))}
//     </List>
//   );
// }
