import { makeStyles } from "@material-ui/core";
import { blueGrey, grey } from "@material-ui/core/colors";
import { colors } from "./colors";

export const useStyles = makeStyles((theme) => ({
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
  listIcon: {
    fontWeight: "700",
    color: blueGrey[600],
    fontSize: "14px",
    lineHeight: "14px",
    minWidth: "105px",
    textTransform: "capitalize",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
      lineHeight: "13px",
    },
  },
  listText: {
    color: grey[700],
    fontSize: "14px",
    lineHeight: "14px",
    textTransform: "capitalize",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      lineHeight: "12px",
    },
  },
}));
