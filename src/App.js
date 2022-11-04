import React, { useState, useMemo } from "react";

import AutoComplete from "./AutoComplete";
import { autoCompleteData } from './data';

function App() {
  const [options, setOptions] = useState([]);
  const [optionIndex, setOptionIndex] = useState(0);
  const [optionActive, setOptionActive] = useState(false);
  const [value, setValue] = useState("");
  const [defaultMessage, setDefaultMessage] = useState(false);

  const data = autoCompleteData;

  const selectedValue = useMemo(
    () => data.find((d) => d === value),
    [value]
  );

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterOptions = data.filter(
        (option) => option.toLowerCase().indexOf(query) > -1
      );
      setOptions(filterOptions);
      setOptionActive(true);
    } else {
      setOptionActive(false);
    }
  };

  const handleShowMessage = () => {
    setDefaultMessage(true);
  };

  const handleHideMessage = () => {
    setDefaultMessage(false);
  };

  const handleClick = (e) => {
    setOptions([]);
    setValue(e.target.innerText);
    setOptionActive(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      if (optionIndex === 0) {
        return;
      }
      setOptionIndex(optionIndex - 1);
    }
    else if (e.keyCode === 40) {
      if (optionIndex - 1 === options.length) {
        return;
      }
      setOptionIndex(optionIndex + 1);
    }
    else if (e.keyCode === 13) {
      setValue(options[optionIndex]);
      setOptionIndex(0);
      setOptionActive(false);
    }
  };

  return (
    <div className="App">
      <form>
      {selectedValue && <span>{`Selected: ${selectedValue}`}</span>}
       <AutoComplete 
        options={options}
        value={value}
        optionIndex={optionIndex}
        optionActive={optionActive}
        defaultMessage={defaultMessage}
        handleClick={handleClick} 
        handleShowMessage={handleShowMessage}
        handleHideMessage={handleHideMessage}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
      />
      </form>   
    </div>
  );
}

export default App;
