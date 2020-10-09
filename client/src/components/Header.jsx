import React from 'react';
import {Link} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import TheContext from "../TheContext";
import './Header.css'


function Header(props) {
  const { user} = React.useContext(TheContext);
  console.log(user)

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  return (
      <div className="navTopBarContainer">
        <div className="logo">
          <a className="navBarLinkLogo" href="./profile">
            <h1>Ironfolio</h1>
          </a>
        </div>
        <div className={classes.root}>
          <h3>{user?.name}</h3>
          <Avatar src={user?.imageUrl} />
        </div>
      </div>
  );
}

export default Header;