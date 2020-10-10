import React,{ useState, useEffect} from "react";
import "./ArchiveDetail.css";
import actions from "../api/index";


import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';




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

const useStyles = makeStyles({
  table: {
    width: "50vw",
  },
});

function createData(name, projectName, website) {
  return { name, projectName, website };
}

const rows = [
  createData(
    "Rabiul Alam",
    "Kaa -The Snake Game",
    "https://hungry-albattani-0b70e9.netlify.app/"
  ),
  createData(
    "Rebecca, Ashtyn, Jada",
    "G.O.T",
    "https://rqsell.github.io/G-O-T/"
  ),
  createData(
    "Matheus, Matthew",
    "Ergheist Battle Tactics",
    "https://xenodochial-nightingale-702408.netlify.app/"
  ),
  createData("Fabian Pena", "Ghost Town", "https://ghost-town.netlify.app/"),
  createData(
    "Sebastian Grana",
    "3D",
    "https://sheltered-eyrie-18420.herokuapp.com/"
  ),
];

function ArchiveDetail(props) {
  const classes = useStyles();
  

  
useEffect(() => {
  async function getProjects() {
    let res = await actions.getAllClassProjects({class : props.match.params.id})
    console.log(res)
  }
  getProjects();
},[])

  return (
    <div className="archiveDetail">
      <h3>Project 2</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name/Team Name</StyledTableCell>
              <StyledTableCell align="right">Project Name</StyledTableCell>
              <StyledTableCell align="right">Website</StyledTableCell>
              <StyledTableCell align="right">Favorites</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.projectName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href={row.website} target="_blank">Website</a>
                </StyledTableCell>
                <StyledTableCell align="right">
                <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
        label=""
      />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ArchiveDetail;