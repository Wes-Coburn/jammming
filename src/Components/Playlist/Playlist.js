import Track from "../Track/Track";

function Playlist(props) {
  return props.tracks.map((track, i) => (
    <Track key={"track_" + i} title={track.title + " (track_" + i + ")"} />
  ));
}

export default Playlist;
