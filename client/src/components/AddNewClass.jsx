import React, { useState } from "react";
import TheContext from "../TheContext";
import actions from "../api/index";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
            fullWidth
            className="editField"
            onChange={(e) => setLocation(e.target.value)}
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
            placeholder="Jan,Feb etc..."
            variant="outlined"
          />
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setYear(e.target.value)}
            id="outlined-basic"
            label="Year"
            placeholder="2020,2021 etc..."
            variant="outlined"
          />
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setClassType(e.target.value)}
            id="outlined-basic"
            label="Full / Part Time"
            placeholder="FT or PT"
            variant="outlined"
          />
        </FormControl>
        <Button
          className="btnUpdate"
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddNewClass;
