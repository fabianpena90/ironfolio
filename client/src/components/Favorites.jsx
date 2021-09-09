import React, { useEffect, useState } from 'react';
import './Favorites.css';
// Material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import actions from '../api/index';
import TheContext from '../TheContext';
import Favorite from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '2%',
  },
});

function Favorites(props) {
  const classes = useStyles();
  const { user, history } = React.useContext(TheContext);
  const [favorites, setFavorites] = useState([]);

  if (!user.email) {
    history.push('/login');
  }
  if (props.user.class === 'Test') {
    history.push('/');
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
    <Paper className={classes.root}>
      <Typography variant="h2" gutterBottom>
        Favorites
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography variant="body1" gutterBottom>
                  Cohort
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="body1" gutterBottom>
                  Student Name
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="body1" gutterBottom>
                  Project Name
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="body1" gutterBottom>
                  Link
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="body1" gutterBottom>
                  Favorites
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites?.map((row) => (
              <StyledTableRow key={row?._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  <Typography variant="body1" gutterBottom>
                    {row?.studentsID?.[0].class}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.studentsID.map((eachName) => {
                    return (
                      <p>
                        <Typography variant="body1" gutterBottom>
                          {eachName?.name}
                        </Typography>
                      </p>
                    );
                  })}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography variant="body1" gutterBottom>
                    {row?.projectName}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    href={row?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body1" gutterBottom>
                      Website
                    </Typography>
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
    </Paper>
  );
}

export default Favorites;
