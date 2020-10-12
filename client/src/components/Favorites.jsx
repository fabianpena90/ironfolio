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
import Favorite from '@material-ui/icons/Favorite';

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


function Favorites(props) {
  const classes = useStyles();
  const { user } = React.useContext(TheContext);
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    async function getFavoriteProjects() {
      let res = await actions.getAllFavoriteProjects({favorites: user.favorites})
      setFavorites(res?.data.allProjects)
      console.log(res.data)
    }
    getFavoriteProjects();
  },[])


  async function handleDeleteFavorites(e){
    let targetProject = e.target?.parentElement.getAttribute('data')
    console.log(targetProject)
    //debugger
    let res = await actions.deleteFavorites({targetProject})
    console.log(res.data)
   // debugger
    setFavorites(res.data?.delFavorites.favorites)
  }

  
console.log(favorites)
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
            {favorites?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {/* {row.className} */}Need Help
                </StyledTableCell>
                <StyledTableCell align="right">
                  {/* {row.studentName} */} Niko
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.projectName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href={row.website} target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                </StyledTableCell>
                <StyledTableCell align="right">
                <IconButton onClick={(e)=>{handleDeleteFavorites(e)}}><Favorite data={row._id} color="secondary" /></IconButton>
                
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
