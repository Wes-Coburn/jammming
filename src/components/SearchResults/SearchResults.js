import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";

function SearchResults(props) {
  let resultsMessage = "Search Results";
  if (props.searchTerm) {
    resultsMessage = props.tracks.length ? 'Search results for' : 'No results for';
    resultsMessage += ` "${props.searchTerm}"`;
  }

  return (
    <div className="SearchResults-div">
      <h2 id="search-term">{resultsMessage}</h2>
      <Tracklist
        tracks={props.tracks}
        isRemoval={props.isRemoval}
        onAddTrack={props.onAddTrack}
      />
    </div>
  );
}

export default SearchResults;
