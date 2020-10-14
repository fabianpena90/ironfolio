import React from "react";
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
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
import GroupAddIcon from "@material-ui/icons/GroupAdd";

// Import Components
import TheContext from "../TheContext";

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
  const { user } = React.useContext(TheContext);
  // console.log(user)
  const logOut = async () => {
    let res = await actions.logOut();
    window.confirm("Are you sure you want to log out?");
    props.setUser(null);
    props.history.push("/");
  };

  return (
    // <Container maxWidth="xl">
    <div>
      <Router>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <MenuList className="navbarContainer">
            <Link to="/" className="navBarLinks">
              <MenuItem>
                <AccountBoxRoundedIcon className="menuIcon" />
                Profile
              </MenuItem>
            </Link>
            <Divider />
            {user.userType === "admin" ? (
              <Link to="/addNewClass" className="navBarLinks">
                <MenuItem>
                  <GroupAddIcon className="menuIcon" />
                  Add New Class
                </MenuItem>
                <Divider />
              </Link>
            ) : null}
            <Link to="/newproject" className="navBarLinks">
              <MenuItem>
                <AddBoxIcon className="menuIcon" />
                Add New Project
              </MenuItem>
            </Link>
            <Divider />
            <Divider />
            <Link className="navBarLinks" to="/archive">
              <MenuItem>
                <ArchiveRoundedIcon className="menuIcon" />
                Archive
              </MenuItem>
            </Link>
            <Divider />
            <Link className="navBarLinks" to="/favorites">
              <MenuItem>
                <FavoriteBorderRoundedIcon className="menuIcon" />
                Favorites
              </MenuItem>
            </Link>
            <Divider />
            <Link
              className="navBarLinks"
              to="https://iqueue.netlify.app/"
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
      </Router>
    </div>
    // </Container>
  );
};

export default NavBar;
