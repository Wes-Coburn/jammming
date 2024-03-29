import React from "react";
import { useState } from "react";
//import { Outlet } from "react-router-dom";

// Components
import Header from "../Header";
import Playlist from "../Playlist";
import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";

// APIs
import Spotify from "../../util/Spotify";

export default function Root() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // utility function to deal with unexpected/unintuitive sorting by Spotify
  const sortTracks = (tracks) => {
    if (!tracks) {
      return [];
    }

    return tracks.sort((a, b) => {
      return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
    });
  };

  const search = (term) => {
    if (term) {
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
    <React.Fragment>
      <div className="App">
        <Header />
        <SearchBar onSearch={search} />

        <main className="App-main">
          <Playlist
            playlistName={playlistName}
            onSetPlaylistName={setPlaylistName}
            tracks={playlistTracks}
            onRemoveTrack={removeTrack}
            onSaveToSpotify={saveToSpotify}
          />
          <SearchResults
            tracks={searchResults}
            onAddTrack={addTrack}
            searchTerm={searchTerm}
          />
        </main>
      </div>
    </React.Fragment>
  );
}
