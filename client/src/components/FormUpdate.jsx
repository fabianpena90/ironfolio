import React, {useState, useEffect} from 'react';
import actions from "../api/index";
import TheContext from "../TheContext";

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
    display: "flex",
    flexDirection: "row",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FormUpdate(props) {
  console.log(props.match.params.id)
  const { history } = React.useContext(TheContext);
  const classes = useStyles();

  const [project, setProject] = useState()
  const [projectName, setProjectName] = useState()
  const [description, setDescription] = useState()
  const [website, setWebsite] = useState()
  

  async function addProjects() {
    let res2 = await actions.addProject({project, projectName, description, website});
    console.log(res2, "Fabian & Rabiul are the shit!");
  }

  return (
    <div>
      <div className="add-new">
    <h1>Add Your Projects</h1>
    <div >
      <form>
      <FormControl className={classes.formControl} variant="outlined">
      <InputLabel  htmlFor="outlined-selectClass-native-simple">
            Select Project
          </InputLabel>
          <Select
            native
            label="selectClass"
            inputProps={{
              name: "selectClass",
              id: "outlined-selectClass-native-simple",
            }}
          >
            <option aria-label="None" value=""/>
            <option aria-label="None" value="project1">Project 1</option>
            <option aria-label="None" value="project2">Project 2</option>
            <option aria-label="None" value="project3">Project 3</option>
            <option aria-label="None" value="project4">Project 4</option>
            <option aria-label="None" value="project5">Project 5</option>
           
          </Select>
        <TextField required="true"  id="outlined-basic" name="projectName" label="Project Name" variant="outlined" />
        {/* <TextField required="true"  id="outlined-basic" name="description" label="Description" variant="outlined" /> */}
        <TextField required="true" id="outlined-basic" name="website" label="Website" variant="outlined" />
      </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          name="description"
          multiline
          rows={4}
          variant="outlined"
          required="true"
        />
        <Button size="large" variant="contained" type="submit">Submit</Button>
      </form>
      </div>
      
    </div>
  );
    </div>
  );
}

export default FormUpdate;