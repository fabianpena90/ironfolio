import React, { useState, useEffect } from "react";
import "./AddNew.css";
import actions from "../api/index";
import TheContext from "../TheContext";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
    alignItems: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

const AddNew = (props) => {
  const classes = useStyles();
  const { user, history } = React.useContext(TheContext);
  const [project, setProject] = useState();
  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState();
  const [website, setWebsite] = useState();

  async function addProjects() {
    let res = await actions.addProject({
      class: user.class,
      project,
      projectName,
      description,
      website,
    });
    //console.log(res, "Fabian & Rabiul are the shit!");
  }

  if (props.user.class === "Test") {
    history.push("/");
  }
  if (!user.email) {
    history.push("/login");
  }
  const handleSubmit = (e) => {
    addProjects();
    history.push("/");
    //e.preventDefault();
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
