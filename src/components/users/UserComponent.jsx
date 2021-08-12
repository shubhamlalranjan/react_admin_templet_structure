import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUser from "./AddUser/AddUser";
import UserDetails from "./UserDetails";
import EditUser from "./EditUser";
import UserProfilePic from "./UserProfilePic";

export default function UserComponent() {
  return (
    <div>
      {/* userDetails adduser edit user add profile pic */}
      <h1>User Component</h1>
      <Switch>
        <Route path="/add" component={AddUser} />
        <Route path="/details/:userId" render={(props) => <UserDetails />} />
        <Route path="/edit/:userId" render={(props) => <EditUser />} />
        <Route
          path="/profile_pic/:userId"
          render={(props) => <UserProfilePic />}
        />
      </Switch>
    </div>
  );
}
