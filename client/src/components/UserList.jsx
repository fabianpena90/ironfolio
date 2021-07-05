import React, { useContext } from 'react';
import TheContext from '../TheContext';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 250,
    marginTop: '10px',
  },
}));

export default function UserList({ users }) {
  const classes = useStyles();
  const { user } = useContext(TheContext);
  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Divider />
      <Typography variant="h3" gutterBottom>
        Active Users
      </Typography>

      <List dense className={classes.root}>
        <Divider />
        {Object.values(users).map((student, index) => {
          return (
            <div key={student[0]}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt={student[0]} src={student[1]} />
                </ListItemAvatar>
                <ListItemText primary={student[0]} />
                <ListItemIcon>
                  {user.name === student[0] ? <StarIcon /> : null}
                </ListItemIcon>
              </ListItem>
              {Object.values(users).length !== index + 1 ? (
                <Divider variant="inset" component="li" />
              ) : null}
            </div>
          );
        })}
        <Divider />
      </List>
    </Container>
  );
}
