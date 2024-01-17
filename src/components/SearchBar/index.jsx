import React from 'react';
import PropTypes from 'prop-types';
import { useCallback, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./SearchBar.css";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const keyDownHandler = useCallback((event) => {
    if (event.code === "Enter") {
      searchHandler();
    }
  }, []);

  const termChangeHandler = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const searchHandler = useCallback(() => {
    props.onSearch(searchTerm);
  }, [props.onSearch, searchTerm]);

  return (
    <div className="SearchBar-div">
      <TextField
        id="search-bar"
        onChange={termChangeHandler}
        onKeyDown={keyDownHandler}
        label="Song, Artist, or Album"
        variant="outlined"
      />
      <Button variant="contained" onClick={searchHandler}>
        Search
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchBar;
