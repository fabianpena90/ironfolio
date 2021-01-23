import React, { useState, useEffect, useContext } from 'react';
import actions from '../api/index';
import TheContext from '../TheContext';
import './FormUpdate.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { NotificationManager } from 'react-notifications';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
function FormUpdate(props) {
  const { history, user } = useContext(TheContext);
  const classes = useStyles();
  const [projectName, setProjectName] = useState([]);
  const [description, setDescription] = useState([]);
  const [website, setWebsite] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [classMate, setClassMate] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const errorState = { website: false, projectName: false, description: false };
  const [errorIndicator, setErrorIndicator] = useState(errorState);
  if (!user.email) {
    history.push('/login');
  }
  if (props.user.class === 'Test') {
    history.push('/');
  }

  useEffect(() => {
    async function getData() {
      let result = await actions.getEditProject({
        projectId: props.match.params.id,
      });
      setProjectName(result.data?.valueField.projectName);
      setDescription(result.data?.valueField.description);
      setWebsite(result.data?.valueField.website);
      setTeamMembers(result.data.valueField.studentsID);

      let result2 = await actions.getStudentList({ class: user.class });
      setClassMate(result2?.data?.nameList);
    }
    getData();
  }, []);

  const projectSchema = yup.object().shape({
    projectName: yup.string().max(30),
    description: yup.string().max(255),
    website: yup.string().url(),
  });

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  function editProjects() {
    projectSchema
      .validate({
        projectId: props.match.params.id,
        projectName,
        description,
        website,
        teamMembers,
      })
      .then((data) => {
        NotificationManager.info('Project Updated', 'Success', 4000, true);
        actions.editProject(data);
        history.push('/');
      })
      .catch((err) => {
        let keyWord = err.errors[0].split(' ')[0];
        setErrorIndicator({ ...errorState, [keyWord]: true });
        NotificationManager.error(
          err.errors[0].capitalize(),
          'Error',
          4000,
          true
        );
      });
  }

  const handleSubmit = (e) => {
    editProjects();
    e.preventDefault();
  };
  const handleChange = (e) => {
    setTeamMembers(
      teamMembers.includes(e.target.value)
        ? teamMembers.filter((m) => m !== e.target.value)
        : [...teamMembers, e.target.value]
    );
    // (e.target.checked)?setTeamMembers([...teamMembers, e.target.value]):(teamMembers.splice(teamMembers.indexOf(e.target.value),1))
  };
  const handleSwitch = () => {
    setTrigger(!trigger);
  };

  return (
    <div className="formUpdate">
      <div>
        <h2 className="editHeader">Edit Projects</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl} variant="outlined">
          <TextField
            inputProps={{ maxLength: 30 }}
            error={errorIndicator.projectName}
            fullWidth
            className="editField"
            onChange={(e) => setProjectName(e.target.value)}
            id="outlined-basic"
            value={projectName}
            variant="outlined"
          />
          <TextField
            error={errorIndicator.website}
            fullWidth
            className="editField"
            onChange={(e) => setWebsite(e.target.value)}
            id="outlined-basic"
            value={website}
            variant="outlined"
          />
        </FormControl>
        <TextField
          inputProps={{ maxLength: 255 }}
          error={errorIndicator.description}
          className="editField"
          onChange={(e) => setDescription(e.target.value)}
          id="outlined-multiline-static"
          multiline
          rows={8}
          variant="outlined"
          fullWidth
          value={description}
        />
        <Grid container justify="center">
          <Button
            color="secondary"
            className="btnUpdate"
            size="large"
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </Grid>
      </form>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              // color="secondary"
              onChange={handleSwitch}
            />
          }
          label="Add or Remove Collaborator?"
        />
      </FormGroup>
      {trigger ? (
        <List id="studentName" dense className={classes.root}>
          <h3>Select Collaborator</h3>
          {classMate.map((eachMate) => {
            return eachMate._id === user._id ? (
              <ListItem className="eachName" key={eachMate._id} button>
                <ListItemAvatar>
                  <Avatar alt="classMate" src={eachMate.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={`${eachMate?.name}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    // onChange={(e)=>{handleChange(e)}}
                    // value={`${eachMate._id}`}
                    disabled
                    checked
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ) : teamMembers.includes(eachMate._id) ? (
              <ListItem key={eachMate._id} button>
                <ListItemAvatar>
                  <Avatar alt="classMate" src={eachMate.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={`${eachMate?.name}`} />
                <ListItemSecondaryAction>
                  <FormControlLabel
                    control={
                      <Checkbox
                        edge="end"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={`${eachMate._id}`}
                        defaultChecked
                      />
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ) : (
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
            );
          })}
        </List>
      ) : null}
    </div>
  );
}
export default FormUpdate;
