//import logo from "./logo.svg";
import { useState } from "react";
import logo from "./assets/images/cd_icon.png";
import "./App.css";

// Components
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

// Mocks
//import tracksMock from "./tracksMock";

// APIs
import Spotify from "./util/Spotify";

function App() {
  // use state for playlist here
  const [searchResults, setSearchResults] = useState([]); //{tracksMock}
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = () => {
    const term = document.getElementById("search-bar").value;

    if (term) {
      console.log('Search term:', term);
      
      Spotify.search(term).then(results => {
        console.log('resolved promise', results);
        document.getElementById('search-term').innerHTML = `Search Results for "${term}"`;
        setSearchResults(results);
      });
    }
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
    document.getElementById('playlist-name').value = name;
  };

  const addTrack = (track) => {
    if (playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((previousTracks) => [...previousTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(
      playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id)
    );
  };

  const saveToSpotify = () => {
    //const trackUris = playlistTracks.map(track => track.uri);
    // API >>> save to spotify
    updatePlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  window.addEventListener("load", Spotify.getAccessToken);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      
      <SearchBar onSearch={search} />

      <main className="App-main">
        <SearchResults tracks={searchResults} onAddTrack={addTrack} />
        <Playlist
          playlistName={playlistName}
          tracks={playlistTracks}
          onRemoveTrack={removeTrack}
          onChange={updatePlaylistName}
          onSaveToSpotify={saveToSpotify}
        />
      </main>
    </div>
  );
}

export default App;
