import { makeStyles } from "@material-ui/core";
import { blue, blueGrey } from "@material-ui/core/colors";

const drawerWidth = "250px";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  mainContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      marginTop: "65px",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  //sidenav  styles

  navlink: {
    color: blueGrey[700],
    transition: "0.8s",
    "&:hover  div": {
      color: blue["A400"],
    },
  },
  navButton: { width: "100%", textTransform: "capitalize" },
  selectedNav: {
    color: `${blue[800]} !important`,
    fontWeight: " bolder",
    " & div": {
      color: `${blue[800]} !important`,
    },
  },
}));

export default useStyles;
