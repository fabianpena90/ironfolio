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
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 18,
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
  const [favorites, setFavorites] = useState(props.user.favorites);

  useEffect(() => {
    async function getProjects() {
      let res = await actions.getAllClassProjects({
        class: props.match.params.id,
      });
      setAllProjects(res?.data.allProjects);

      let res2 = await actions.getFavProjects();
      setFavorites(res2?.data.favorites);
    }
    getProjects();
  }, []);

  async function handleDeleteFavorites(targetProject) {
    let res = await actions.deleteFavoritesArchive({ targetProject });
    setFavorites(res?.data.favorites);
  }
  async function handleAddFavorites(targetProject) {
    let res = await actions.addFavorites({ targetProject });

    setFavorites(res?.data.favorites);
  }

  return (
    <div className="archiveDetail">
      <h2>Projects</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Project #</StyledTableCell> */}
              <StyledTableCell align="center">Student/Team Name</StyledTableCell>
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
                  {/* <StyledTableCell component="th" scope="row">
                    {eachRow.project}
                  </StyledTableCell> */}
                  <StyledTableCell component="th" scope="row">
                    {eachRow?.studentsID.map((studentName) => {
                      return (
                      <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar src={studentName.imageUrl}>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={studentName.name}
                            />
                          </ListItem>
                      </List>
                        )
                    })}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {eachRow.projectName}
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    {eachRow.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      href={eachRow?.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Website
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
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
