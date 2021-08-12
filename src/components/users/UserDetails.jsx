import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  Paper,
} from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import { useStyles } from "./BodyStyles";
import { ListItemComponent, PageHeader } from "../common/Components";
import { GetUserDetails } from "../../apis/user";

import { Link } from "react-router-dom";
import { ParserUserDetails } from "../../utils/userDetails";
import DetailsBox from "./DetailsBox";
import UserDetailsContext from "../../Context/UserDetailsContext";
import UserEditMain from "./EditUser/UserEditMain";
import { UserEditSteps } from "./EditUser/UserEditStep";
// import MetaTags from "react-meta-tags";

export default function UserDetails({ match }) {
  const classes = useStyles();
  const userId = match.params.userId;
  const [userDetails, setUserDetails] = useState({});
  const [userProfileImages, setUserProfileImages] = useState(null);
  const [userDetailsRow, setUserDetailsRow] = useState({});
  const [dialogName, setDialogName] = useState("");
  const fetchUser = async () => {
    const response = await GetUserDetails(userId);
    if (response.ok) {
      // console.log(response.data);
      console.log("userDetails:-.");
      const Data = response.data.userDetails;
      const Details = ParserUserDetails(Data);
      const ProfilePics = [];
      if (Data.profile_pics) {
        Data.profile_pics.resized.w_300.forEach((item) => {
          const url = `https://${item.bucket}.s3.ap-south-1.amazonaws.com/${item.key}`;
          ProfilePics.push(url);
        });
      }
      setUserDetailsRow(Data);
      setUserProfileImages(ProfilePics);
      setUserDetails(Details);
    }
  };

  // useEffect(() => {
  // 	if (Object.keys(userDetailsRow).length) {
  // 		setUserDetails(ParserUserDetails(userDetailsRow));
  // 		console.log('calling Use Effect');
  // 	}
  // }, [userDetailsRow]);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const setUserDetailsRowFn = (value) => {
    if (Object.keys(value).length) {
      setUserDetailsRow(value);
      setUserDetails(ParserUserDetails(value));
      console.log("calling Use Effect");
    }
  };

  return (
    <Paper component={Box} mt={1}>
      <UserDetailsContext.Provider
        value={{
          userDetails: userDetailsRow,
          setUserDetails: setUserDetailsRowFn,
        }}
      >
        <UserEditMain user={userId} name={dialogName} setName={setDialogName} />
      </UserDetailsContext.Provider>
      <Box pl={3} pt={2}>
        <PageHeader label="user Details" title=" Details" />
      </Box>
      <Grid container spacing={1}>
        {/* for image operation  */}
        <Grid item xs={12} sm={4}>
          <Paper component={Box} p={1}>
            <Carousel
              showArrows={false}
              showThumbs={false}
              emulateTouch={true}
              infiniteLoop={false}
              autoPlay={false}
              autoFocus={false}
              stopOnHover={true}
            >
              {userProfileImages ? (
                userProfileImages.map((item, i) => (
                  <div key={i}>
                    <img
                      alt="Profile Pic"
                      src={item}
                      className={classes.responsiveImg}
                    />
                  </div>
                ))
              ) : (
                <CircularProgress />
              )}
            </Carousel>
          </Paper>

          <Box align="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/changeProfilePic/${userId}`}
            >
              Add Profile Pic
            </Button>
          </Box>
        </Grid>
        {/* grid  details  */}
        <Grid item xs={12} sm={8}>
          <List dense={true}>
            {userDetails ? (
              <>
                <DetailsBox
                  label="Basic"
                  onClick={() => setDialogName(UserEditSteps.BASIC)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Name"}
                        label={userDetails.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent icon={"Age"} label={userDetails.age} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent icon={"DOB"} label={userDetails.DOB} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Gender"}
                        label={userDetails.gender}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Status"}
                        label={userDetails.status}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="apperence"
                  onClick={() => setDialogName(UserEditSteps.APPEARANCE)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Height"}
                        label={userDetails.height}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Complexion"}
                        label={userDetails.complexion}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Body Type"}
                        label={userDetails.body_type}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Doctrine"
                  onClick={() => setDialogName(UserEditSteps.DOCTORINE)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Religion"}
                        label={userDetails.religion}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Caste"}
                        label={userDetails.caste}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Gotra"}
                        label={userDetails.gotra}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Dosh"}
                        label={userDetails.dosh}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Mother Tongue"}
                        label={userDetails.mother_tongue}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Profession"
                  onClick={() => setDialogName(UserEditSteps.PROFESSION)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Occupation"}
                        label={userDetails.occupation}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Working With"}
                        label={userDetails.working_with}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Organization"}
                        label={userDetails.organization}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Income"}
                        label={userDetails.income}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Education"
                  onClick={() => setDialogName(UserEditSteps.EDUCATION)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Education Level"}
                        label={userDetails.education_level}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Heighest Degree"}
                        label={userDetails.education}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Stream"}
                        label={userDetails.education_stream}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Alias"}
                        label={userDetails.education_alias}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Field"}
                        label={userDetails.education_field}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Institute"}
                        label={userDetails.college}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Life Style"
                  onClick={() => setDialogName(UserEditSteps.LIFESTYLE)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Dite"}
                        label={userDetails.dite}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Drinking Habit"}
                        label={userDetails.drinking}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Smoke  Habbit"}
                        label={userDetails.smokeing}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Family"
                  onClick={() => setDialogName(UserEditSteps.FAMILY)}
                >
                  <Grid container>
                    {userDetails.no_of_kids > 0 ? (
                      <Grid item xs={12} sm={12}>
                        <ListItemComponent
                          icon={"Self Kids"}
                          label={userDetails.no_of_kids}
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Father Name"}
                        label={userDetails.father_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Father Status"}
                        label={userDetails.father_profession}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Mother Name"}
                        label={userDetails.mother_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Mother Status"}
                        label={userDetails.mother_profession}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Sisters"}
                        label={userDetails.sisters}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Married"}
                        label={userDetails.sisters_married}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Brothers"}
                        label={userDetails.brothers}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Married"}
                        label={userDetails.brothers_married}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Contact"
                  onClick={() => setDialogName(UserEditSteps.CONTACT)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Phone"}
                        label={userDetails.phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Phone Verified"}
                        label={userDetails.phone_verified}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Email"}
                        label={userDetails.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Email Verified"}
                        label={userDetails.email_verified}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Native Address"
                  onClick={() => setDialogName(UserEditSteps.ADDRESS)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Country"}
                        label={userDetails.native_country}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"State"}
                        label={userDetails.native_state}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"District"}
                        label={userDetails.native_district}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"City"}
                        label={userDetails.native_city}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemComponent
                        icon={"Pincode"}
                        label={userDetails.native_zip_code}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemComponent
                        icon={"Lane 1"}
                        label={userDetails.native_lane_1}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemComponent
                        icon={"Lane 2"}
                        label={userDetails.native_lane_2}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>

                <DetailsBox
                  label="Working Address"
                  onClick={() => setDialogName(UserEditSteps.ADDRESS)}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"Country"}
                        label={userDetails.working_country}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"State"}
                        label={userDetails.working_state}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"District"}
                        label={userDetails.working_district}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemComponent
                        icon={"City"}
                        label={userDetails.working_city}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemComponent
                        icon={"Pincode"}
                        label={userDetails.working_zip_code}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemComponent
                        icon={"Lane 1"}
                        label={userDetails.working_lane_1}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemComponent
                        icon={"Lane 2"}
                        label={userDetails.working_lane_2}
                      />
                    </Grid>
                  </Grid>
                </DetailsBox>
              </>
            ) : null}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}
