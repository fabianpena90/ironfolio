import React, { useState, useEffect } from "react";
import actions from "../api/index";
import TheContext from "../TheContext";
import "./FormUpdate.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

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
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function FormUpdate(props) {
  const { history, user } = React.useContext(TheContext);
  const classes = useStyles();

  const [project, setProject] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [description, setDescription] = useState([]);
  const [website, setWebsite] = useState([]);
  const [teamMembers, setTeamMembers] = useState([user._id]);
  const [classMate, setClassMate] = useState([]);
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    async function getData() {
      let result = await actions.getEditProject({
        projectId: props.match.params.id,
      });
      setProjectName(result.data?.valueField.projectName);
      setDescription(result.data?.valueField.description);
      setWebsite(result.data?.valueField.website);
      // setTeamMembers(result.data.valueField)

      let result2 = await actions.getStudentList({ class: user.class });
      setClassMate(result2?.data?.nameList);
    }
    getData();
  }, []);

  async function editProjects() {
    let res2 = await actions.editProject({
      projectId: props.match.params.id,
      projectName,
      description,
      website,
      teamMembers,
    });
    // console.log(res2, "Fabian & Rabiul are the shit!");
  }

  const handleSubmit = (e) => {
    editProjects();
    history.push("/profile");
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.target.checked
      ? setTeamMembers([...teamMembers, e.target.value])
      : teamMembers.splice(teamMembers.indexOf(e.target.value), 1);
  };

  console.log(teamMembers);
  const a = [...projectName];
  return (
    <div>
      <div>
        <h1 className="editHeader">Edit Projects</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl
          className={classes.formControl}
          variant="outlined"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setProjectName(e.target.value)}
            id="outlined-basic"
            name="projectName"
            label={a.join("")}
            variant="outlined"
          />
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setWebsite(e.target.value)}
            id="outlined-basic"
            name="website"
            label={website}
            variant="outlined"
          />
        </FormControl>
        <TextField
          className="editField"
          onChange={(e) => setDescription(e.target.value)}
          id="outlined-multiline-static"
          name="description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          label="Description"
          placeholder={description}
        />
        <Button
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Update
        </Button>
      </form>
      <List dense className={classes.root}>
        {classMate.map((eachMate) => {
          return(
            eachMate._id === user._id ? (
              <ListItem key={eachMate._id} button>
                <ListItemAvatar>
                  <Avatar alt="classMate" src={eachMate.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={`${eachMate?.name}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={`${eachMate._id}`}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ) : (
              <>Hello</>
            );
          }
        ))}
      </List>
    </div>
  );
}

export default FormUpdate;
