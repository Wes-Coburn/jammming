import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Tracklist from "../Tracklist";
import "./Playlist.css";

function Playlist(props) {
  function onChangeHandler(event) {
    props.onSetPlaylistName(event.target.value);
  }
  
  return (
    <div className="Playlist-div">
      <TextField
        id="playlist-name"
        label="Playlist Name"
        variant="outlined"
        onChange={onChangeHandler}
        value={props.playlistName} // <<< This was missing to make the state hook work
        //placeholder={props.playlistName}
      />

      <Tracklist
        tracks={props.tracks}
        isRemoval={true}
        onAddTrack={props.onAddTrack}
        onRemoveTrack={props.onRemoveTrack}
      />
      <br />
      <Button
        variant="contained"
        onClick={props.onSaveToSpotify}>
        Save to Spotify
      </Button>
    </div>
  );
}
Playlist.propTypes = {
  playlistName: PropTypes.string.isRequired,
  onSetPlaylistName: PropTypes.func.isRequired,
  tracks: PropTypes.array,
  onAddTrack: PropTypes.func.isRequired,
  onRemoveTrack: PropTypes.func.isRequired,
  onSaveToSpotify: PropTypes.func.isRequired,
}

export default Playlist;
