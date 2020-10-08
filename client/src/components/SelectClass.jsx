import React, {useState, useEffect} from 'react';
import actions from '../api/index'

function SelectClass(props) {
  const [selectClass, setSelectClass] = useState("");
   console.log('test ')
  //  if(props.user.class === ""){
  //   <select>
  //     <option>MIA</option>
  //   </select>
  // }
      async function getClasses() {
      // let res = await axios.get("http://localhost:5000/api/getAllMovies")
      let res = await actions.getAllClasses()
      console.log(res.data.selectClass, "Fabnian & Rabiul are the shit!");
      // setSelectClass(res.data);
    }
    getClasses()

  return (
    <div>
      
    </div>
  );
}

export default SelectClass;