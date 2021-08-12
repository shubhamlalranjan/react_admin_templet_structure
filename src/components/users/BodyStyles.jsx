import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { colors } from "../Theme";

export const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(2, 0),
  },
  pageLabel: {
    color: colors.baselight,
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
  },
  pageHeader: {
    color: colors.baseDark,
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },
  responsiveImg: {
    width: "100%",
    height: "auto",
  },
  spanRow: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  },
  spanLeft: {
    width: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spanRight: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  listTitle: {
    color: blueGrey[800],
  },
  listIcon: {
    minWidth: "93px",
    textTransform: "capitalize",
    color: blueGrey[500],
    paddingRight: "5px",
    fontWeight: "500px",
  },
  listText: {
    textTransform: "capitalize",
    color: blueGrey[800],
    padding: "0px 5px",
  },
  // dashboard

  //users page
  pagination_root: {
    position: "relative",
    bottom: "-60px",
    left: "0px",
    marginTop: theme.spacing(2),
  },
  pagination_ul: {
    display: "flex",
    justifyContent: "center",
  },

  //userOverview section
  cardTitle: {
    color: colors.baseDark,
  },
  generalGraph: {
    width: "100%",
    height: "300px",
  },

  // userS Routes

  userCard: {
    position: "relative",
  },
  userCardDetails: {
    bottom: "0px",
    right: "0px",
    position: "absolute",
    background: "#ffffff",
    overflowY: "auto",
    maxHeight: "60px",
    "&::-webkit-scrollbar": { width: "0em" },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: "1px solid slategrey",
    },
  },
  uploadedUserImage: {
    position: "relative",
  },
  deleteUserImage: {
    position: "absolute",
    top: "-26px",
    right: "-20px",
  },
  uploadUserImageBox: {
    width: "100%",
    maxWidth: "150px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "160px",
    border: "6px solid #2196f3",
    borderRadius: "10px 85px 0px 0px",
    margin: "10px auto",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "5px 55px 0px 0px",
      border: "4px solid #2196f3",
      maxWidth: "100px",
      minHeight: "120px",
    },
  },

  //footer
  footer: {
    padding: "8px 24px 16px 270px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 24px 16px 24px",
    },
  },
}));
