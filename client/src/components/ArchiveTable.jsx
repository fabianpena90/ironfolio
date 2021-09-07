import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './ArchiveTable.css';
import actions from '../api/index';
import TheContext from '../TheContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const columns = [
  { id: 'name', label: 'Class', align: 'center' },
  { id: 'students', label: 'Students', align: 'center' },
  {
    id: 'projects',
    label: 'Projects',
    align: 'center',
  },
];

function createData(name, students, projects) {
  return { name, students, projects };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '2%',
  },
  container: {
    height: 'max-content',
  },
});

export default function ArchiveTable() {
  const { user, history } = useContext(TheContext);
  if (!user.email) {
    history.push('/login');
  }
  if (user.class === 'Test') {
    history.push('/');
  }

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const formatClass = (eachClass) => {
    return (
      `${eachClass.location}` +
      '-' +
      `${eachClass.month}` +
      '-' +
      `${eachClass.year}` +
      '-' +
      `${eachClass.classType}`
    );
  };

  useEffect(() => {
    async function getClasses() {
      const res = await actions.getAllClasses();
      setRows(res.data.selectClass);
    }
    getClasses();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h2" gutterBottom>
        Web Dev Classes
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  <Typography variant="body1" gutterBottom>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell align="center">
                      <Link
                        component={RouterLink}
                        className="listItem"
                        to={`/archive/${formatClass(row)}`}
                      >
                        <Typography variant="body1" gutterBottom>
                          {formatClass(row)}{' '}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" gutterBottom>
                        {row.studentsID ? row.studentsID.length : 'N/A'}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" gutterBottom>
                        {row.projectsID ? row.projectsID.length : 'N/A'}{' '}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
