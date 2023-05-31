import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

function SearchResults(props) {
  return (
    <div className="SearchResults-div">
      <h2 id='search-term'>Search Results</h2>
      <Tracklist
        tracks={props.tracks}
        isRemoval={props.isRemoval}
        onAddTrack={props.onAddTrack}
      />
    </div>
  );
}

export default SearchResults;
