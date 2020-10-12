import React, {useEffect,useState} from "react";
import "./Favorites.css";
// Material UI
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
import actions from "../api/index";
import TheContext from "../TheContext";

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

function createData(className, studentName, projectName, projectURL) {
  return { className, studentName, projectName, projectURL };
}

const rows = [
  createData(
    "MIA 2020",
    "Rabiul Alam",
    "Kaa -The Snake Game",
    "https://hungry-albattani-0b70e9.netlify.app/"
  ),
  createData(
    "MIA 2020",
    "Rebecca, Ashtyn, Jada",
    "G.O.T",
    "https://rqsell.github.io/G-O-T/"
  ),
  createData(
    "MIA 2020",
    "Matheus, Matthew",
    "Ergheist Battle Tactics",
    "https://xenodochial-nightingale-702408.netlify.app/"
  ),
  createData(
    "MIA 2020",
    "Fabian Pena",
    "Ghost Town",
    "https://ghost-town.netlify.app/"
  ),
  createData(
    "MIA 2020",
    "Sebastian Grana",
    "3D",
    "https://sheltered-eyrie-18420.herokuapp.com/"
  ),
];

function Favorites(props) {
  const classes = useStyles();
  const { user } = React.useContext(TheContext);
  const [favorites, setFavorites] = useState([])
  console.log(user)

  useEffect(() => {
    async function getFavoriteProjects() {
      let res = await actions.getAllFavoriteProjects({favorites: user.favorites})
    }
    getFavoriteProjects();
  },[])


  return (
    <div className="archiveDetail">
      <h3>Your Favorites</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Class Name</StyledTableCell>
              <StyledTableCell>Student / Team Name</StyledTableCell>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="right">Website / URL</StyledTableCell>
              <StyledTableCell align="right">Favorites</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.className}>
                <StyledTableCell component="th" scope="row">
                  {row.className}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.studentName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.projectName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href={row.projectURL} target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Favorites;
