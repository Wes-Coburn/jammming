import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./SearchBar.css";

function SearchBar(props) {
  function onKeyDownHandler(event) {
    if (event.code === "Enter") {
      props.onSearch(event);
    }
  }

  return (
    <div className="SearchBar-div">
      <TextField id="search-bar" onKeyDown={onKeyDownHandler} label="Song, Artist, or Album" variant="outlined" />
      <Button variant="contained" onClick={props.onSearch}>Search</Button>
    </div>
  );
}

export default SearchBar;
