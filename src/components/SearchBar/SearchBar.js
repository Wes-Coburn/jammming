import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./SearchBar.css";

function SearchBar(props) {
  const [rawSearchTerm, setRawSearchTerm] = useState("");

  function onKeyDownHandler(event) {
    if (event.code === "Enter") {
      onSearchHandler();
    }
  }

  function onChangeHandler(event) {
    setRawSearchTerm(event.target.value);
  }

  function onSearchHandler() {
    props.onSearch(rawSearchTerm);
  }

  return (
    <div className="SearchBar-div">
      <TextField
        id="search-bar"
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        label="Song, Artist, or Album"
        variant="outlined"
      />
      <Button variant="contained" onClick={onSearchHandler}>
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
