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
  // const { history } = React.useContext(TheContext);
  const classes = useStyles();

  const [project, setProject] = useState()
  const [projectName, setProjectName] = useState()
  const [description, setDescription] = useState()
  const [website, setWebsite] = useState()
  console.log(projectName, description, website)

  async function editProjects() {
    let res2 = await actions.editProject({projectId: props.match.params.id, projectName, description, website});
    console.log(res2, "Fabian & Rabiul are the shit!");
  }

  const handleSubmit = (e) => {
    // debugger
    editProjects();
    // history.push('/profile')
    e.preventDefault();
  }


  return (
    <div>
      <div className="add-new">
    <h1>Edit Projects</h1>
    <div >
      <form onSubmit={handleSubmit}>
      <FormControl className={classes.formControl} variant="outlined" onSubmit={handleSubmit}>
        <TextField onChange={(e) => setProjectName(e.target.value)} required="true"  id="outlined-basic" name="projectName" label="Project Name" variant="outlined" />
        {/* <TextField required="true"  id="outlined-basic" name="description" label="Description" variant="outlined" /> */}
        <TextField onChange={(e) => setWebsite(e.target.value)} required="true" id="outlined-basic" name="website" label="Website" variant="outlined" />
        <TextField
        onChange={(e) => setDescription(e.target.value)}
          id="outlined-multiline-static"
          label="Description"
          name="description"
          multiline
          rows={4}
          variant="outlined"
          required="true"
        />
      </FormControl>
        <Button size="large" variant="contained" type="submit">Submit</Button>
      </form>
      </div>
      
    </div>
  );
    </div>
  )};

export default FormUpdate;