import React, { useState, useEffect } from "react";
import "./ArchiveDetail.css";
import actions from "../api/index";
import TheContext from "../TheContext";

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
    width: "50vw",
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
  async function handleDeleteFavorites(e) {
    let targetProject = e.target?.parentElement.getAttribute("data");
    let res = await actions.deleteFavoritesArchive({ targetProject });
    setFavorites(res.data?.delFavorites.favorites);
  }

  async function handleAddFavorites(e) {
    let targetProject = e.target?.getAttribute("data");
    let res = await actions.addFavorites({ targetProject });
    setFavorites(res.data?.addFavorites.favorites);
  }

  return (
    <div className="archiveDetail">
      <h3>Projects</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project #</StyledTableCell>
              <StyledTableCell>Name/Team Name</StyledTableCell>
              <StyledTableCell align="right">Project Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Website</StyledTableCell>
              <StyledTableCell align="right">Favorites</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProjects?.map((eachRow) => {
              return  (
                <StyledTableRow key={eachRow._id}>
                    <StyledTableCell component="th" scope="row">
                      {eachRow.project}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {eachRow?.studentsID.map((studentName) => {
                        return <li>{studentName.name}</li>;
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {eachRow.projectName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {eachRow.description}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <a
                        href={eachRow.website}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Website
                      </a>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {favorites?.includes(eachRow._id) ? (
                        <IconButton
                          onClick={(e) => {
                            handleDeleteFavorites(e);
                          }}
                        >
                          <Favorite data={eachRow._id} color="secondary" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={(e) => {
                            handleAddFavorites(e);
                          }}
                        >
                          <FavoriteBorder data={eachRow._id} />
                        </IconButton>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ArchiveDetail;
