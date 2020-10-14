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
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    minWidth: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
    alignItems: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

const AddNew = () => {
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
    console.log(res, "Fabian & Rabiul are the shit!");
  }

  console.log(user);
  const handleSubmit = (e) => {
    addProjects();
    history.push("/");
    //e.preventDefault();
  };

  return (
    <div>
      <div>
        <h1>Add Your Projects</h1>
      </div>
      <div>
        <form id="add-new" onSubmit={handleSubmit}>
          <FormControl
            id="formControl"
            className={classes.formControl}
            variant="outlined"
            onSubmit={handleSubmit}
          >
            <InputLabel
              className="addNewForm"
              htmlFor="outlined-selectClass-native-simple"
            >
              Select Project
            </InputLabel>
            <Select
              native
              fullWidth="true"
              required="true"
              className="addNewForm"
              label="Select Project"
              onChange={(e) => {
                setProject(e.target.value);
              }}
              placeholder="selectClass"
              // inputProps={{
              //   name: "selectClass",
              //   id: "outlined-selectClass-native-simple",
              // }}
            >
              <option aria-label="None" value="" />
              <option aria-label="None" value="Project 1">
                Project 1
              </option>
              <option aria-label="None" value="Project 2">
                Project 2
              </option>
              <option aria-label="None" value="Project 3">
                Project 3
              </option>
              <option aria-label="None" value="Project 4">
                Project 4
              </option>
              <option aria-label="None" value="Project 5">
                Project 5
              </option>
              <option aria-label="None" value="Bonus">
                Bonus
              </option>
            </Select>
            <TextField
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
          <Button
            className="btnAdd"
            size="large"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
