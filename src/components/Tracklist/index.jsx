import React from 'react';
import Track from "../Track";
import "./Tracklist.css";

function Tracklist(props) {
  if (!props.tracks) {
    throw new Error('Tracks is empty!');
  }
  
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
