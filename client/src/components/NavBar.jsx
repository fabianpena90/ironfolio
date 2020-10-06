import React from "react";
import "./NavBar.css";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Link from '@material-ui/core/Link';


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
    <div >
      <div className="navTopBarContainer">
        <div className="logo">
          <Link className="navBarLinkLogo" href="./"><h1>Ironfolio</h1></Link>
        </div>
        <div className="profilePic">
          <Avatar src="/broken-image.jpg" />
        </div>
      </div>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <MenuList>
            <Link href='./profile' className="navBarLinks"><MenuItem>Profile</MenuItem></Link>
            <Divider />
            <Link className="navBarLinks" href='./archive'><MenuItem>Archive</MenuItem></Link>
            <Divider />
            <Link className="navBarLinks" href='./favorites'><MenuItem>Favorites</MenuItem></Link>
            <Divider />
            <Link className="navBarLinks" href='https://iqueue.netlify.app/' target='_blank'><MenuItem>IronQueue</MenuItem></Link>
            <Divider />
            <Link className="navBarLinks" href='./logout'><MenuItem>Logout</MenuItem></Link>
          </MenuList>
        </Paper>
      </div>
    </div>
  );
};

export default NavBar;
