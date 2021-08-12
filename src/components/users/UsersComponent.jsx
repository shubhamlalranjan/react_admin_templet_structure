import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Typography,
  CardContent,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { PageHeader } from "../common/Components";
import { useStyles } from "./BodyStyles";
import { GetResentUser, GetUsersByFilter } from "../../apis/user";
import { ParseUsersBoxData } from "../../utils/userMainPage";
import { Link } from "react-router-dom";
import { blueGrey } from "@material-ui/core/colors";
import UsersFilterForm, { initialValues } from "./UsersFilterForm";

export default function UsersComponent() {
  const classes = useStyles();
  const [Fetched, setFetched] = useState(false);
  const [Users, setUsers] = useState([]);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState(20);
  //for dialog purpose
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const [formValues, setFormValues] = useState(initialValues);

  const callUserApi = (values, pageNo) => {
    setNoRecordFound(false);
    setUsers([]);
    GetUsersByFilter({ ...values, content, page: pageNo })
      .then((response) => {
        console.log("Data", response.data);
        const users = ParseUsersBoxData(response.data.users);
        if (!users.length) {
          setNoRecordFound(true);
        }
        console.log(users);
        setUsers(users);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    callUserApi(formValues, page);
  }, [page]);

  //calling posts api
  useEffect(() => {
    GetResentUser().then((response) => {
      if (response.ok) {
        const users = ParseUsersBoxData(response.data.users);
        console.log(users);
        setUsers(users);
      } else {
        const errorMessage = response.data
          ? response.data.message
          : response.problem;
        console.log(errorMessage);
      }
    });
  }, [Fetched]);

  const handleFormSubmit = (values, FormContextBag) => {
    callUserApi(values);
    setFormValues(values);
    setPage(1);
    handleDialogClose();
  };

  return (
    <Box mt={2}>
      <PageHeader
        label="Users"
        title="All Users"
        actionBtn={true}
        btnLabel={"Search"}
        handleOnClick={() => handleDialogOpen()}
      />
      <Grid container spacing={1}>
        {Users.length <= 0 ? (
          <Typography
            align="center"
            style={{ width: "100%", marginTop: "50px" }}
          >
            {noRecordFound ? (
              <p>No Record Found!</p>
            ) : (
              <CircularProgress color="primary" />
            )}
          </Typography>
        ) : (
          Users.map((item, i) => (
            <Grid
              key={i}
              item
              xs={6}
              sm={4}
              md={3}
              component={Link}
              to={`/user/${item._id}`}
            >
              <Card>
                {console.log("user:-", item)}
                <div style={{ maxHeight: "260px", overflowY: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.image}
                    className={classes.responsiveImg}
                  />
                </div>
                <CardContent>
                  <Typography
                    variant="body1"
                    style={{
                      textTransform: "capitalize",
                      color: blueGrey[800],
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {item.age} | {item.height} {item.religion} | {item.caste}{" "}
                    {item.motherTongue} | {item.education} | {item.income} |
                    {item.profession} | {item.district}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* /adding pagination  */}

      <UsersFilterForm
        open={open}
        handleDialogClose={handleDialogClose}
        handleFormSubmit={handleFormSubmit}
      />
      <Box textAlign="center" mt={2}>
        <Pagination
          count={10}
          color="primary"
          onChange={(e, pageNo) => {
            setPage(pageNo);
          }}
          classes={{
            root: classes.pagination_root, // class name, e.g. `classes-nesting-root-x`
            ul: classes.pagination_ul, // class name, e.g. `classes-nesting-label-x`
          }}
        />
      </Box>
    </Box>
  );
}
