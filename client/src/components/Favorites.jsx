import React, { useEffect, useState } from "react";
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
import Favorite from "@material-ui/icons/Favorite";
import Link from "@material-ui/core/Link";

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


function Favorites(props) {
  const { user, history } = React.useContext(TheContext);
  const [favorites, setFavorites] = useState([]);

  if (!user.email) {
    history.push("/login");
  }
  if (props.user.class === "Test") {
    history.push("/");
  }

  useEffect(() => {
    async function getFavoriteProjects() {
      let user = await actions.favoriteSection();
      // console.log(user.data.favorites);
      setFavorites(user?.data?.favorites);
    }
    getFavoriteProjects();
  }, []);

  async function handleDeleteFavorites(targetProject) {
    let res = await actions.deleteFavorites({ targetProject });
    setFavorites(res.data?.delFavorites.favorites);
  }

  return (
    <div className="archiveDetail">
      <h2>Your Favorites</h2>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Cohort</StyledTableCell>
              <StyledTableCell align="center">Student Name</StyledTableCell>
              <StyledTableCell align="center">Project Name</StyledTableCell>
              <StyledTableCell align="center">URL</StyledTableCell>
              <StyledTableCell align="center">Favorites</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites?.map((row) => (
              <StyledTableRow key={row?._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row?.studentsID?.[0].class}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.studentsID.map((eachName) => {
                    return <p>{eachName?.name}</p>;
                  })}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.projectName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    href={row?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    onClick={(e) => {
                      handleDeleteFavorites(row?._id);
                    }}
                  >
                    <Favorite data={row?._id} color="secondary" />
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
