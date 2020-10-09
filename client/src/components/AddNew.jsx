import React, {useState, useEffect} from 'react';
import './AddNew.css'
import actions from "../api/index";
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddNew = () => {
  const classes = useStyles();
  const [project, setProject] = useState()
  const [projectName, setProjectName] = useState()
  const [description, setDescription] = useState()
  const [website, setWebsite] = useState()
  

  async function addProjects() {
    let res = await actions.addProject({project, projectName, description, website});
    console.log(res, "Fabian & Rabiul are the shit!");
  }

  const handleSubmit = (e) => {
    addProjects();
    e.preventDefault();
  }

  return (
    <div className="add-new">
    <h1>Add Your Projects</h1>
    <div>
      <form action="">
      <FormControl className={classes.formControl} variant="outlined" onSubmit={handleSubmit}>
      <InputLabel htmlFor="outlined-selectClass-native-simple">
            Select Project
          </InputLabel>
          <Select
            native
            onChange={(e) => {
              setProject(e.target.value);
            }}
            label="selectClass"
            inputProps={{
              name: "selectClass",
              id: "outlined-selectClass-native-simple",
            }}
          >
            <option aria-label="None" value="" />
           
          </Select>
        <TextField onChange={(e) =>{setProjectName(e.target.value)}} id="outlined-basic" name="projectName" label="Project Name" variant="outlined" />
        <TextField onChange={(e) =>{setDescription(e.target.value)}} id="outlined-basic" name="description" label="Description" variant="outlined" />
        <TextField onChange={(e) =>{setWebsite(e.target.value)}} id="outlined-basic" name="website" label="Website" variant="outlined" />
        <Button size="large" variant="contained" type="submit">Submit</Button>
      </FormControl>
      </form>
      </div>
      
    </div>
  );
};

export default AddNew;
