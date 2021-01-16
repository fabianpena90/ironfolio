import React, { useState, useContext } from 'react';
import TheContext from '../TheContext';
import actions from '../api/index';
import {
  campuses,
  months,
  years,
  classTypes,
} from '../constans/newClassCategories';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    maxWidth: 200,
    margin: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

function AddNewClass(props) {
  const classes = useStyles();
  const { user, history } = useContext(TheContext);
  const [location, setLocation] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [classType, setClassType] = useState();

  if (user.userType !== 'admin') {
    history.push('/');
  }

  async function createClass() {
    await actions.createClass({
      classType,
      location,
      month,
      year,
    });
  }

  const handleSubmit = () => {
    createClass();
    history.push('/archive');
  };

  return (
    <div>
      <div>
        <h2 className="editHeader">Add Class</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl required className={classes.formControl}>
          <InputLabel>Campus</InputLabel>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={classes.selectEmpty}
          >
            <MenuItem value=""></MenuItem>
            {campuses.map((c) => {
              return <MenuItem value={c.code}>{c.campus}</MenuItem>;
            })}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={classes.selectEmpty}
          >
            <MenuItem value=""></MenuItem>
            {months.map((m) => {
              return <MenuItem value={m.code}>{m.month}</MenuItem>;
            })}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={classes.selectEmpty}
          >
            <MenuItem value=""></MenuItem>
            {years.map((y) => {
              return <MenuItem value={y.year}>{y.year}</MenuItem>;
            })}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel>Class Types</InputLabel>
          <Select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            className={classes.selectEmpty}
          >
            <MenuItem value=""></MenuItem>
            {classTypes.map((c) => {
              return <MenuItem value={c.code}>{c.type}</MenuItem>;
            })}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <Grid container justify="center">
          <Button
            className="btnUpdate"
            size="large"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default AddNewClass;
