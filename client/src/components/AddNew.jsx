import React from 'react';
import './AddNew.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const AddNew = () => {
  const classes = useStyles();

  return (
    <div className="add-new">
    <h1>Add Your Projects</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Project Name" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
        <TextField id="outlined-basic" label="Website" variant="outlined" />
        <Button size="large" variant="contained">Submit</Button>
      </form>
    </div>
  );
};

export default AddNew;
