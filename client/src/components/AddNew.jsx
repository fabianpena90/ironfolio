import React, { useState, useContext } from 'react';
import './AddNew.css';
import actions from '../api/index';
import TheContext from '../TheContext';
import * as yup from 'yup';
import {
  NotificationManager,
} from 'react-notifications';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

const AddNew = (props) => {
  const classes = useStyles();
  const { user, history } = useContext(TheContext);
  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState();
  const [website, setWebsite] = useState();
  console.log(website);

  const projectSchema = yup.object().shape({
    projectName: yup.string().max(24),
    description: yup.string().max(255),
    website: yup.string().url(),
  });
  
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

  function addProjects() {
    projectSchema
      .validate({
        projectName,
        description,
        website,
      })
      .then((data) => {
        actions.addProject(data);
        history.push('/');
      })
      .catch((err) => {
        NotificationManager.error(err.errors[0].capitalize(), 'Error', 4000, true);
        console.log(err.errors[0]);
      });
  }

  if (props.user.class === 'Test') {
    history.push('/');
  }
  if (!user.email) {
    history.push('/login');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addProjects();
  };

  return (
    <div>
      <div>
        <h2>Add Your Project</h2>
      </div>
      <div>
        <form id="add-new" onSubmit={handleSubmit}>
          <FormControl
            id="formControl"
            className={classes.formControl}
            variant="outlined"
            onSubmit={handleSubmit}
          >
            <TextField
              autoFocus
              className="addNewForm"
              fullWidth="true"
              required="true"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              id="outlined-basic"
              name="projectName"
              label="Project Name"
              variant="outlined"
            />
            <TextField
              className="addNewForm"
              fullWidth="true"
              required="true"
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              id="outlined-basic"
              name="website"
              label="Website"
              variant="outlined"
              placeholder="https://www.google.com"
            />
          </FormControl>
          <TextField
            className="addNewForm"
            id="outlined-multiline-static"
            label="Description"
            name="description"
            multiline
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            variant="outlined"
            required="true"
            placeholder="max 255 characters..."
            fullWidth
            rows={8}
          />
          <Grid container justify="center">
            <Button
              color="secondary"
              className="btnAdd"
              size="large"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
