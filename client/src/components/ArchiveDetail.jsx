import React, { useState, useEffect } from "react";
import "./ArchiveDetail.css";
import actions from "../api/index";
import TheContext from "../TheContext";
import Link from "@material-ui/core/Link";

// Material UI Components
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
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    width: "70vw",
  },
});
function ArchiveDetail(props) {
  const classes = useStyles();
  const [allProjects, setAllProjects] = useState([]);
  const { user } = React.useContext(TheContext);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    async function getProjects() {
      let res = await actions.getAllClassProjects({
        class: props.match.params.id,
      });
      setAllProjects(res.data?.allProjects);
      setFavorites(user.favorites);
    }
    getProjects();
  }, []);

  console.log(allProjects);
  async function handleDeleteFavorites(targetProject) {
    // let targetProject = e.target?.parentElement.getAttribute("data");
    // console.log(targetProject)
    console.log(targetProject)

    let res = await actions.deleteFavoritesArchive({ targetProject });
    setFavorites(res.data?.delFavorites.favorites);
  }
  async function handleAddFavorites(targetProject) {
    console.log(targetProject)
    // let targetProject = e.target?.getAttribute("data");
    // console.log(targetProject)
    let res = await actions.addFavorites({ targetProject });
    setFavorites(res.data?.addFavorites.favorites);
  }

  console.log(favorites)
  return (
    <div className="archiveDetail">
      <h2>Projects</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project #</StyledTableCell>
              <StyledTableCell>Name/Team Name</StyledTableCell>
              <StyledTableCell align="center">Project Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Website</StyledTableCell>
              <StyledTableCell align="center">Favorites</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProjects?.map((eachRow) => {
              return (
                <StyledTableRow key={eachRow._id}>
                  <StyledTableCell component="th" scope="row">
                    {eachRow.project}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {eachRow?.studentsID.map((studentName) => {
                      console.log(studentName)
                      return <p>{studentName.name}</p>;
                    })}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {eachRow.projectName}
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    {eachRow.description}
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    <Link href={eachRow?.website} rel="noopener noreferrer" target="_blank">
                      Website
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                  Hello
                    {favorites?.includes(eachRow._id) ? (
                      <IconButton
                        onClick={(e) => {
                          handleDeleteFavorites(eachRow._id);
                        }}
                      >
                        <Favorite data={eachRow._id} color="secondary" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={(e) => {
                          handleAddFavorites(eachRow._id);
                        }}
                      >
                        <FavoriteBorder data={eachRow._id} />
                      </IconButton>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ArchiveDetail;
