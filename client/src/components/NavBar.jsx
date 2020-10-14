import React from "react";
import "./NavBar.css";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
// import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ArchiveRoundedIcon from "@material-ui/icons/ArchiveRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import ContactSupportRoundedIcon from "@material-ui/icons/ContactSupportRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import Link from "@material-ui/core/Link";
import actions from "../api/index";

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

const NavBar = (props) => {
  const classes = useStyles();

  const logOut = async () => {
    let res = await actions.logOut();
    window.confirm('Are you sure you want to log out?')
    props.setUser(null);
    props.history.push("/");
  };

  return (
    // <Container maxWidth="xl">
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <MenuList className="navbarContainer">
            <Link href="/" className="navBarLinks">
              <MenuItem>
                <AccountBoxRoundedIcon className="menuIcon" />
                Profile
              </MenuItem>
            </Link>
            <Divider />
            <Link href="/newproject" className="navBarLinks">
              <MenuItem>
                <AddBoxIcon className="menuIcon" />
                Add new project
              </MenuItem>
            </Link>
            <Divider />
            <Divider />
            <Link className="navBarLinks" href="/archive">
              <MenuItem>
                <ArchiveRoundedIcon className="menuIcon" />
                Archive
              </MenuItem>
            </Link>
            <Divider />
            <Link className="navBarLinks" href="/favorites">
              <MenuItem>
                <FavoriteBorderRoundedIcon className="menuIcon" />
                Favorites
              </MenuItem>
            </Link>
            <Divider />
            <Link
              className="navBarLinks"
              href="https://iqueue.netlify.app/"
              target="_blank"
            >
              <MenuItem>
                <ContactSupportRoundedIcon className="menuIcon" />
                IronQueue
              </MenuItem>
            </Link>
            <Divider />
            <Link className="navBarLinks" onClick={logOut}>
              <MenuItem>
                <ExitToAppRoundedIcon className="menuIcon" />
                Logout
              </MenuItem>
            </Link>
          </MenuList>
        </Paper>
      </div>
    </div>
    // </Container>
  );
};

export default NavBar;
