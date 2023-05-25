//import logo from "./logo.svg";
import logo from "./assets/images/cd_icon.png";
import "./App.css";
import Playlist from "./Components/Playlist/Playlist";
import trackData from "./trackdata";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Playlist tracks={trackData} />
      </header>
    </div>
  );
}

export default App;
