import React from 'react';
import {AppBar,Toolbar,Typography,Button,IconButton, makeStyles, Hidden } from '@material-ui/core';
// import AppBar from '@material-ui/core ';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavAppBar({setDrawerOpen }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
          <IconButton edge="start" className={classes.menuButton}  color="inherit" aria-label="menu" onClick={() => {
            setDrawerOpen(true)
            console.log("menu clicked")
          }} >
            <MenuIcon />
          </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
