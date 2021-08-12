import { Button, IconButton, ListItemSecondaryAction } from "@material-ui/core";
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "../../styles/commonStyles";

export const PageHeader = ({
  label,
  title,
  actionBtn,
  btnLabel,
  handleOnClick,
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={7} sm={8}>
        <Typography variant="button" className={classes.pageLabel}>
          {label}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.pageHeader}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={5} sm={4}>
        <Typography align="right">
          {actionBtn ? (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<SearchIcon />}
              onClick={handleOnClick}
            >
              {btnLabel}
            </Button>
          ) : (
            ""
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const ListItemKeyValuePair = ({ icon, label }) => {
  const classes = useStyles();
  return (
    <span className={classes.spanRow}>
      <span className={classes.spanLeft}>{icon}</span>
      <span className={classes.spanRight}>{label}</span>
    </span>
  );
};

export const ListTitle = ({ label, secondIcon, handleSecondButton }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <Typography variant="body1" component="h6" className={classes.listTitle}>
        {" "}
        {label}{" "}
      </Typography>
      {secondIcon ? (
        <ListItemSecondaryAction>
          <IconButton onClick={handleSecondButton} color="primary">
            {secondIcon}
          </IconButton>
        </ListItemSecondaryAction>
      ) : null}
    </ListItem>
  );
};

export const ListItemComponent = ({ icon, label }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
      <ListItemText className={classes.listText}>{label}</ListItemText>
    </ListItem>
  );
};

export const CoustomButton = ({ label, ...other }) => {
  const classes = useStyles();
  return <Button {...other}>{label}</Button>;
};
