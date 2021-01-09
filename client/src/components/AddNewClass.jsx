import React, { useState } from "react";
import TheContext from "../TheContext";
import actions from "../api/index";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    minWidth: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
    alignItems: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

function AddNewClass(props) {
  const classes = useStyles();
  const { user, history } = React.useContext(TheContext);
  const [location, setLocation] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [classType, setClassType] = useState();

  if (user.userType !== "admin") {
    history.push("/");
  }

  async function createClass() {
    let result = await actions.createClass({
      classType,
      location,
      month,
      year,
    });
  }

  const handleSubmit = () => {
    createClass();
    history.push("/archive");  
  };

  return (
    <div>
      <div>
        <h2 className="editHeader">Add Class</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl
          className={classes.formControl}
          variant="outlined"
          // onSubmit={handleSubmit}
        >
          <TextField
            autoFocus
            fullWidth
            className="editField"
            onChange={(e) => setLocation(e.target.value)}
            inputProps={{style: {textTransform: 'uppercase'}}}
            id="outlined-basic"
            label="Location"
            placeholder="MIA etc..."
            variant="outlined"
          />
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setMonth(e.target.value)}
            id="outlined-basic"
            label="Month"
            inputProps={{style: {textTransform: 'uppercase'}}}
            placeholder="JAN,FEB etc..."
            variant="outlined"
          />
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setYear(e.target.value)}
            id="outlined-basic"
            label="Year"
            placeholder="2021,2022 etc..."
            variant="outlined"
          />
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setClassType(e.target.value)}
            id="outlined-basic"
            inputProps={{style: {textTransform: 'uppercase'}}}
            label="Full / Part Time"
            placeholder="FT or PT"
            variant="outlined"
          />
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
