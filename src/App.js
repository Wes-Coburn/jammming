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
  const [searchResults, setSearchResults] = useState([]); //{tracksMock}
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sortTracks = (tracks) => {
    if (!tracks) {
      return [];
    }

    return tracks.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  };

  const search = (term) => {
    if (term) {
      console.log("Search term:", term);
      Spotify.search(term).then((results) => {
        setSearchTerm(term);
        setSearchResults(sortTracks(results));
      });
    }
  };

  const addTrack = (track) => {
    if (playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((previousTracks) => [...previousTracks, track]);
    setSearchResults(
      searchResults.filter(
        (searchResultTrack) => searchResultTrack.id !== track.id
      )
    );
  };

  const removeTrack = (track) => {
    setPlaylistTracks(
      playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id)
    );
    const newTracks = sortTracks([...searchResults, track]);
    setSearchResults(newTracks);
  };

  const saveToSpotify = () => {
    if (!playlistName || !playlistTracks.length) {
      return;
    }

    const trackUris = playlistTracks.map((track) => track.uri);
    // Create playlist and add tracks
    Spotify.CreatePlaylist(playlistName, trackUris);
    // Reset playlist
    setPlaylistName("");
    setSearchResults(sortTracks(searchResults.concat(playlistTracks)));
    //setSearchResults(sortTracks([...searchResults, ...playlistTracks]));
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
        <SearchResults
          tracks={searchResults}
          onAddTrack={addTrack}
          searchTerm={searchTerm}
        />
        <Playlist
          playlistName={playlistName}
          onSetPlaylistName={setPlaylistName}
          tracks={playlistTracks}
          onRemoveTrack={removeTrack}
          onSaveToSpotify={saveToSpotify}
        />
      </main>
    </div>
  );
}

export default App;
