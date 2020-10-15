import React, { useEffect, useState } from "react";
import "./Profile.css";
import actions from "../api/index";
import TheContext from "../TheContext";
import { Link as RouterLink } from "react-router-dom";

// Material UI
import Link from "@material-ui/core/Link";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50vw",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
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
    minWidth: 250,
  },
}));

function Profile(props) {
  const classes = useStyles();
  const { history } = React.useContext(TheContext);
  const [selectClass, setSelectClass] = useState([]);
  const [assignClass, setAssignClass] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editProjects, setEditProjects] = useState([]);

  useEffect(() => {
    async function getClasses() {
      let res = await actions.getAllClasses();
      setSelectClass(res?.data.selectClass);
      // console.log(res.data);

      let res2 = await actions.getStudentProject();
      setProjects(res2?.data.allProjects.projects);
    }
    getClasses();
  }, []);

  //console.log(props);
  function handleSubmit(e) {
    let res = actions.setClass({ assignClass });
  }
  function handleDelete(value) {
    let res = actions.deleteProject({ deleteProject: value });
    let newProject = [...projects].filter((eachProject) => {
      return eachProject._id !== value;
    });
    console.log(res.data, newProject);

    setProjects(newProject);
  }

  // console.log(deleteProject);
  function showClass() {
    return selectClass?.map((eachClass) => {
      // console.log(eachClass);

      return (
        <option>
          {eachClass.location}
          {"-"}
          {eachClass.month}
          {"-"}
          {eachClass.year}
          {"-"}
          {eachClass.classType}
        </option>
      );
    });
  }

  if (props.user.class === "Test") {
    return (
      <div className="instructions">
        <div className="instructions-body">
          <h2>Instructions</h2>
          <article>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </article>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="outlined-selectClass-native-simple">
                Select Class
              </InputLabel>
              <Select
                native
                onChange={(e) => {
                  //console.log(e.target.value);
                  setAssignClass(e.target.value);
                }}
                label="selectClass"
                inputProps={{
                  name: "selectClass",
                  id: "outlined-selectClass-native-simple",
                }}
              >
                <option aria-label="" value="Test" />
                {showClass()}
              </Select>

              <Button variant="contained" size="large" type="submit">
                Submit
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div id="projects">
        <h2>My Projects</h2>
        <TableContainer component={Paper}>
          <Table
            id="tableProfile"
            className={classes.table}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Project Name</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell>Website / URL</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.projectName}
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    <Link
                      href={row.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Website
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link component={RouterLink} to={`/editProject/${row._id}`}>
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
                    <Button
                      onClick={() => handleDelete(row._id)}
                      value={row._id}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Profile;
