import React, { useEffect, useState } from "react";
import "./Profile.css";
import actions from "../api/index";
import TheContext from "../TheContext";
import Link from "@material-ui/core/Link"

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
      setSelectClass(res.data?.selectClass);
      
      let res2 = await actions.getStudentProject();
      setProjects(res2.data?.allProjects?.projects)
    }
    getClasses();
  }, []);
  function handleSubmit(e) {
    //e.preventDefault();
    let res = actions.setClass({ assignClass });
  }
<<<<<<< HEAD
  function handleDelete(e) {
      let res = actions.deleteProject({deleteProject: e.target.parentElement.value})
      if(res){
        history.push('/newproject')
      } 
=======
  function handleDelete(value) {
      let res = actions.deleteProject({deleteProject: value})
      // if(res){
      //   history.push('/profile')
      // } 
      let newProject = [...projects].filter(eachProject =>{
        return eachProject._id !== value
      })
      console.log(res.data, newProject)

      setProjects(newProject)
>>>>>>> a873bff2f34cbb2b2ea8437d01b114d78299f042
  }

  // function handleUpdate(e) {
  //   return ()
  // }

  
 // console.log(deleteProject);
  function showClass() {
    return selectClass.map((eachClass) => {
      return (
        <option>
          {eachClass.location}
          {"-"}
          {eachClass.month}
          {"-"}
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
              {projects.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.projectName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.website}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                  <Link href={`/profile/${row._id}`}>
                    <Button
                      value={row._id}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button></Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={()=>handleDelete(row._id)}
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
