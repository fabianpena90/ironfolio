import React from 'react';
import {Link} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import TheContext from "../TheContext";
import './Header.css'


function Header(props) {
  const { user} = React.useContext(TheContext);
  //console.log(user)

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
            <h1 className="headerText">Ironfolio</h1>
        </div>
        <div className={classes.root}>
          <h3 className="headerText">{user?.name}</h3>
          <Avatar src={user?.imageUrl} />
        </div>
      </div>
  );
}

export default Header;