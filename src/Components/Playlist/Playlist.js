import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

function Playlist(props) {
  function handleChange(event) {
    props.onChange(event.target.value);
  }
  
  return (
    <div className="Playlist-div">
      <TextField
        id="playlist-name"
        //label="Playlist Name"
        variant="outlined"
        placeholder={props.playlistName}
        onChange={handleChange}
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

export default Playlist;
