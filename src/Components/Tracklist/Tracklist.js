import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist(props) {
  return props.tracks.map((track, i) => (
    <Track
      key={"track_" + i}
      track={track}
      isRemoval={props.isRemoval}
      onAddTrack={props.onAddTrack}
      onRemoveTrack={props.onRemoveTrack}
    />
  ));
}

export default Tracklist;
