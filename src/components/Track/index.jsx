import React from 'react';
import PropTypes from 'prop-types';
import Button from "@mui/material/Button";
import "./Track.css";

// >>> Rendering one of the (2) following components causes the 'invalid hook call' warning
//import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
//import AddCircleIcon from '@mui/icons-material/AddCircle';

function Track(props) {
  function addTrack() {
    props.onAddTrack(props.track);
  }
  function removeTrack() {
    props.onRemoveTrack(props.track);
  }

  return (
    <div className="Track-div">
      <p>
        {props.track.name}
        <br />
        {props.track.artist} | {props.track.album}
      </p>
      <Button
        variant="contained"
        onClick={props.isRemoval ? removeTrack : addTrack}>
        {props.isRemoval ? "-" : "+"}
      </Button>
    </div>
  );
}

Track.propTypes = {
  track: PropTypes.string.isRequired,
  onAddTrack: PropTypes.func.isRequired,
  onRemoveTrack: PropTypes.func.isRequired,
  isRemoval: PropTypes.func.isRequired,
}

export default Track;
