import React, {useState, useEffect} from 'react';
import './AddNew.css'
import actions from "../api/index";
// Material UI
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
  const [projects, setProjects] = useState()
  const [website, setWebsite] = useState()
  const [description, setDescription] = useState()

  async function addProjects() {
    let res = await actions.addProject({projects, website, description});
    console.log(res, "Fabian & Rabiul are the shit!");
  }

  const handleSubmit = (e) => {
    addProjects();
    e.preventDefault();
  }

  return (
    <div className="add-new">
    <h1>Add Your Projects</h1>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField onChange={(e) =>{setProjects(e.target.value)}} id="outlined-basic" name="projectName" label="Project Name" variant="outlined" />
        <TextField onChange={(e) =>{setDescription(e.target.value)}} id="outlined-basic" name="description" label="Description" variant="outlined" />
        <TextField onChange={(e) =>{setWebsite(e.target.value)}} id="outlined-basic" name="website" label="Website" variant="outlined" />
        <Button size="large" variant="contained" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddNew;
