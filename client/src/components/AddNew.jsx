import React, { useState, useContext, useEffect, useRef } from 'react';
import './AddNew.css';
import actions from '../api/index';
import TheContext from '../TheContext';
import * as yup from 'yup';
import { NotificationManager } from 'react-notifications';
//Confetti
import Confetti from 'react-confetti';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
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
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '2%',
  },
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
  const { user, history, setProjects, projects } = useContext(TheContext);
  if (user.class === 'Test') {
    history.push('/');
  }
  if (!user.email) {
    history.push('/login');
  }
  const classes = useStyles();
  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState([]);
  const [classMate, setClassMate] = useState([]);
  const [teamMembers, setTeamMembers] = useState([user._id]);
  const [website, setWebsite] = useState();
  const [trigger, setTrigger] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  //confetti
  const [confettiHeight, setConfettiHeight] = useState(null);
  const [confettiWidth, setConfettiWidth] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef();

  useEffect(() => {
    setConfettiWidth(confettiRef.current.clientWidth);
    setConfettiHeight(confettiRef.current.clientHeight);
  }, [confettiRef]);

  const errorState = { website: false, projectName: false, description: false };
  const [errorIndicator, setErrorIndicator] = useState(errorState);

  useEffect(() => {
    async function getData() {
      let result = await actions.getStudentList({ class: user.class });
      setClassMate(result?.data?.nameList.filter((c) => c._id !== user._id));
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
  function addProjects() {
    projectSchema
      .validate({
        class: user.class,
        classID: user.classID,
        projectName,
        description,
        website,
        teamMembers,
      })
      .then(async (projectData) => {
        let res = await actions.addProject(projectData);
        NotificationManager.success('Project Submitted', 'Success', 4000, true);
        setShowConfetti(true);
        setDisableBtn(true);
        projects
          ? setProjects([...projects, res.data.updated])
          : setProjects([res.data.updated]);
        await setTimeout(() => {
          history.push('/');
        }, 5000);
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

  const handleChange = (e) => {
    setTeamMembers(
      teamMembers.includes(e.target.value)
        ? teamMembers.filter((m) => m !== e.target.value)
        : [...teamMembers, e.target.value]
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addProjects();
  };

  return (
    <Paper className={classes.root} ref={confettiRef}>
      <Confetti
        run={showConfetti}
        numberOfPieces={80}
        width={confettiWidth}
        height={confettiHeight}
      />
      <div>
        <Typography variant="h2" gutterBottom>
          Add New Projects
        </Typography>
      </div>
      <div>
        <form id="add-new" onSubmit={handleSubmit}>
          <FormControl
            id="formControl"
            className={classes.formControl}
            variant="outlined"
          >
            <TextField
              inputProps={{ maxLength: 30 }}
              error={errorIndicator.projectName}
              autoFocus
              className="addNewForm"
              fullWidth
              required
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              id="outlined-basic"
              name="projectName"
              label="Project Name"
              variant="outlined"
            />
            <TextField
              error={errorIndicator.website}
              className="addNewForm"
              fullWidth
              required
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
            inputProps={{ maxLength: 255 }}
            error={errorIndicator.description}
            className="addNewForm"
            id="outlined-multiline-static"
            label="Description"
            name="description"
            helperText={`You have entered ${description.length} out of 255 characters.`}
            multiline
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            variant="outlined"
            required
            placeholder="max 255 characters..."
            fullWidth
            rows={8}
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  // color="secondary"
                  onChange={() => {
                    setTrigger(!trigger);
                  }}
                />
              }
              label="Have Collaborator?"
            />
          </FormGroup>
          {trigger && (
            <List id="studentName" dense className={classes.root}>
              <h3>Select Collaborator</h3>
              {classMate.map((eachMate) => {
                return (
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
          )}
          <Grid container justify="center">
            <Button
              color="secondary"
              className="btnAdd"
              size="large"
              variant="contained"
              type="submit"
              disabled={disableBtn}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    </Paper>
  );
};

export default AddNew;
