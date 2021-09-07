import React, { useEffect, useState, useContext } from 'react';
import actions from '../api/index';
import { Link as RouterLink } from 'react-router-dom';
import TheContext from '../TheContext';

// Material UI
import Link from '@material-ui/core/Link';
import AlertDialog from './AlertDialog';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { NotificationManager } from 'react-notifications';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '2%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    // width: "60%",
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    // position: "absolute",
    top: 10,
    width: 1,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 250,
  },
}));

function Profile(props) {
  const classes = useStyles();
  const [selectClass, setSelectClass] = useState([]);
  const [assignClass, setAssignClass] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const { projects, setProjects } = useContext(TheContext);

  useEffect(() => {
    async function getClasses() {
      if (props.user?.class === 'Test') {
        let res = await actions.getAllClasses();
        setSelectClass(res?.data.selectClass.slice(0, 3));
      } else if (!projects) {
        let res2 = await actions.getStudentProject();
        setProjects(res2?.data.allProjects.projects);
      }
    }
    getClasses();
  }, []);

  function handleSubmit(e) {
    actions.setClass({ assignClass, selectedClassId });
  }
  function handleDelete(value) {
    actions.deleteProject({ deleteProject: value });
    let newProjects = [...projects].filter((eachProject) => {
      return eachProject._id !== value;
    });
    setProjects(newProjects);
    NotificationManager.success('Project Deleted', 'Success', 4000, true);
  }

  // console.log(deleteProject);
  function showClass() {
    return selectClass?.map((eachClass) => {
      return (
        <option key={eachClass._id} id={eachClass._id}>
          {eachClass.location}
          {'-'}
          {eachClass.month}
          {'-'}
          {eachClass.year}
          {'-'}
          {eachClass.classType}
        </option>
      );
    });
  }

  if (props.user?.class === 'Test') {
    return (
      <Paper className={classes.root}>
        <Typography variant="h1" gutterBottom>
          Welcome Ironhackers!
        </Typography>
        <ul>
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Please Select Your Cohort." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Once you start adding your projects, they'll appear in your profile." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="You can also add collaborators &#40;if any&#x29;." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Use the archive for inspiration from alumni and save your favorites." />
            </ListItem>
          </List>
        </ul>

        <form onSubmit={handleSubmit}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="outlined-selectClass-native-simple">
              Select Your Cohort
            </InputLabel>
            <Select
              native
              required
              onChange={(e) => {
                setSelectedClassId(
                  e.target.childNodes[e.target.selectedIndex].getAttribute('id')
                );

                setAssignClass(e.target.value);
              }}
              label="SelectYourCohort"
              inputProps={{
                name: 'selectCohort',
                id: 'outlined-SelectYourCohort-native-simple',
              }}
            >
              <option />
              {showClass()}
            </Select>

            <Button
              variant="contained"
              size="large"
              type="submit"
              color="secondary"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.root}>
        <Typography variant="h2" gutterBottom>
          My Projects
        </Typography>

        {projects?.length === 0 ? (
          <Typography align="center" variant="h6" gutterBottom>
            No projects!
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table
              id="tableProfile"
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    <Typography align="center" variant="body1" gutterBottom>
                      Project Name
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography align="center" variant="body1" gutterBottom>
                      Description
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography align="center" variant="body1" gutterBottom>
                      Link
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography align="center" variant="body1" gutterBottom>
                      Edit
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography align="center" variant="body1" gutterBottom>
                      Delete
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects?.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      <Typography align="center" variant="body1" gutterBottom>
                        {row.projectName}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="justify">
                      <Typography align="center" variant="body1" gutterBottom>
                        {row.description}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="justify">
                      <Link
                        href={row.website}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Typography align="center" variant="body1" gutterBottom>
                          Website
                        </Typography>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                        component={RouterLink}
                        to={`/editProject/${row._id}`}
                      >
                        <Button
                          value={row._id}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <AlertDialog handleDelete={handleDelete} id={row._id} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    );
  }
}

export default Profile;
