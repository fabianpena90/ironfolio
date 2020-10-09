import React, { useEffect, useState } from "react";
import "./Profile.css";
import actions from "../api/index";
// Material UI
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
    top: 20,
    width: 1,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
}));

function createData(projectName, description, projectURL) {
  return { projectName, description, projectURL };
}

const rows = [
  createData(
    "Kaa -The Snake Game",
    "Projects Description goes here",
    "https://hungry-albattani-0b70e9.netlify.app/"
  ),
  createData(
    "G.O.T",
    "Projects Description goes here",
    "https://rqsell.github.io/G-O-T/"
  ),
  createData(
    "Ergheist Battle Tactics",
    "Projects Description goes here",
    "https://xenodochial-nightingale-702408.netlify.app/"
  ),
  createData(
    "Ghost Town",
    "Projects Description goes here",
    "https://ghost-town.netlify.app/"
  ),
  createData(
    "3D",
    "Projects Description goes here",
    "https://sheltered-eyrie-18420.herokuapp.com/"
  ),
];

function Profile(props) {
  const classes = useStyles();
  const [selectClass, setSelectClass] = useState([]);
  const [assignClass, setAssignClass] = useState([]);
  const [deleteProject, setDeleteProject] = useState()

  useEffect(() => {
    async function getClasses() {
      // let res = await axios.get("http://localhost:5000/api/getAllMovies")
      let res = await actions.getAllClasses();
      console.log(res.data.selectClass, "Fabnian & Rabiul are the shit!");
      setSelectClass(res.data?.selectClass);

      let des = await actions.getStudentProject();
      console.log(des)
    }
    getClasses();
  }, []);

  function handleDelete(e){
    console.log(e.target.parentElement.value)
  }

  function handleSubmit(e) {
    //e.preventDefault();

    let res = actions.setClass({ assignClass });
    console.log(res);
  }

  console.log(assignClass);
  function showClass() {
    return selectClass.map((eachClass) => {
      return (
        <option>
          {eachClass.location}
          {"---"}
          {eachClass.month}
          {"---"}
          {eachClass.year}
        </option>
      );
    });
  }

  if (props.user.class === "Test") {
    return (
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel htmlFor="outlined-selectClass-native-simple">
            Select Class
          </InputLabel>
          <Select
            native
            onChange={(e) => {
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
    );
  }
  // getClasses();
  else {
    return (
      <div className="archiveDetail">
        <h1>My Projects</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Project Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Website / URL</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.projectName}>
                  <StyledTableCell component="th" scope="row">
                    {row.projectName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.projectURL}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                    value={row._id}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
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
