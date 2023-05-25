import Button from "@mui/material/Button";
import './Track.css';

function Track(props) {
  return <Button variant="contained">{props.title}</Button>;
}

export default Track;
