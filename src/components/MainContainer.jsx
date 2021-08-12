import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUser from "./users/AddUser/AddUser";
import UserDetails from "./users/UserDetails";
import UsersComponent from "./users/UsersComponent";
import UserProfilePic from "./users/UserProfilePic";

export default function MainContainer({ classes }) {
  return (
    <div className={classes.mainContainer}>
      {/* 
      users 
      
      dashboard
      */}
      <Switch>
        <Route exect path="/user/add">
          <AddUser />
        </Route>
        <Route
          path="/user/:userId"
          render={(props) => <UserDetails {...props} />}
        ></Route>
        <Route
          path="/profile_pic/:userId"
          render={(props) => <UserProfilePic />}
        />
        <Route
          path="/users"
          render={(props) => <UsersComponent {...props} />}
        />
      </Switch>
    </div>
  );
}
