import React from 'react';
import PropTypes from 'prop-types';
import Tracklist from "../Tracklist";
import "./SearchResults.css";

function SearchResults(props) {
  let resultsMessage = "Search Results";
  if (props.searchTerm) {
    resultsMessage = `${props.tracks.length} results for "${props.searchTerm}"`;
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

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  tracks: PropTypes.array.isRequired,
  isRemoval: PropTypes.func.isRequired,
  onAddTrack: PropTypes.func.isRequired,
}

export default SearchResults;
