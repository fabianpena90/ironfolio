import React, { useState, useEffect } from "react";
import actions from "../api/index";

function SelectClass(props) {
  const [selectClass, setSelectClass] = useState([]);
  console.log("test ");

  useEffect(() => {
    async function getClasses() {
      // let res = await axios.get("http://localhost:5000/api/getAllMovies")
      let res = await actions.getAllClasses();
      console.log(res.data.selectClass, "Fabnian & Rabiul are the shit!");
      setSelectClass(res.data?.selectClass);
    }
    getClasses();
  }, []);

  function displayClass() {
    if (props.user.class === "Test") {
      return selectClass.map((eachClass) => {
        console.log(eachClass);
        return <p>{eachClass.location}</p>;
      });
      // getClasses();
    }
  }
  return <div>{displayClass()}</div>;
}

export default SelectClass;
