import React from "react";
import "./NavBar.css";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "80vh",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <div className="navTopBarContainer">
        <div className="logo">
          <h1>Ironfolio</h1>
        </div>
        <div className="profilePic">
          <Avatar src="/broken-image.jpg" />
        </div>
      </div>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <Divider />
            <MenuItem>Archive</MenuItem>
            <Divider />
            <MenuItem>Favorites</MenuItem>
            <Divider />
            <MenuItem>IronQueue</MenuItem>
            <Divider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Paper>
      </div>
    </Container>
  );
};

export default NavBar;
