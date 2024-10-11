import React, { useState} from 'react';

const StateTutorial = () => {

    const [inputValue, setinputValue] = useState("Empty");

    const changeValue = (e)=>{
const newvalue = e.target.value;
setinputValue(newvalue);
    }

  return (
    <div>
        <h1>{inputValue}</h1>
<input type='text'value={inputValue} placeholder='Type Something...' onChange={changeValue}></input>
    </div>
  );
};

export default StateTutorial