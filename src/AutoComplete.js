import React from 'react';

const AutoComplete = ({ 
  options, 
  optionIndex,
  handleClick, 
  defaultMessage, 
  value, 
  handleShowMessage, 
  handleHideMessage, 
  handleChange, 
  handleKeyDown, 
  optionActive  
}) => {

  const OptionList = () => {
    return (
      <ul className="options">
        {options.length > 0 ? options.map((option, index) => {
          return (
            <li
              className={index === optionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {option}
            </li>
          );
        }) : 
          <li><span>No Results</span></li>
        }
      </ul>
    );
  };

  return (
    <div className="autocomplete">
      {(defaultMessage && value.length === 0) && <span className='message'>Please type to search</span>}
      <input 
        type="text"
        placeholder="Type to search" 
        value={value}
        onFocus={handleShowMessage}
        onBlur={handleHideMessage}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {optionActive && <OptionList />}    
    </div>
  );
};

export default AutoComplete;