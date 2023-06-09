//const redirectUri = "http://localhost:3000";
const baseUrl = "https://api.spotify.com/v1";
const searchUrl = "/search?type=track";

// Authorization
let accessToken = "";
let userId = "";
const scope = "playlist-modify-public";
const clientId = "776ff261ab1d4cc28f40744d6c7f9064";

const Spotify = {
  headerGET() {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },

  headerPOST(jsonRequest) {
    return {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(jsonRequest),
    };
  },

  getAccessToken() {
    if (accessToken) {
      return;
    }

    try {
      // Checks for access token match. Each returned value will be an array.
      const accessTokenMatch =
        window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      //console.log(accessTokenMatch);
      //console.log(expiresInMatch);

      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);

        // Clears parameters and allows us to grab new Access Token when one expires
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
      } else {
        let authorizeUrl = "https://accounts.spotify.com/authorize";
        authorizeUrl += "?response_type=token";
        authorizeUrl += "&client_id=" + encodeURIComponent(clientId);
        authorizeUrl += "&scope=" + encodeURIComponent(scope);

        const location = window.location.href;
        console.log(location);

        authorizeUrl += "&redirect_uri=" + encodeURIComponent(location);
        window.location.replace(authorizeUrl);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getUserId() {
    if (userId) {
      return;
    }

    try {
      let idUrl = baseUrl;
      idUrl += "/me";
      const response = await fetch(idUrl, this.headerGET());
      const jsonResponse = await response.json();

      if (!jsonResponse.id) {
        throw new Error("user_id not found!");
      }

      userId = jsonResponse.id;
    } catch (error) {
      console.log(error);
    }
  },

  async search(term) {
    try {
      let queryUrl = baseUrl;
      queryUrl += searchUrl;
      queryUrl += "&q=";
      queryUrl += encodeURIComponent(term);
      console.log(`queryUrl:`, queryUrl);

      this.getAccessToken();
      const response = await fetch(queryUrl, this.headerGET());

      const jsonResponse = await response.json();
      console.log("jsonResponse:", jsonResponse);

      if (!jsonResponse.tracks.items.length) {
        throw new Error("No results found!");
      }

      const tracks = jsonResponse.tracks.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
        };
      });

      return tracks;
    } catch (error) {
      console.log(error);
    }
  },

  async CreatePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }

    this.getAccessToken();
    await this.getUserId();

    let createUrl = baseUrl;
    createUrl += "/users";
    createUrl += "/" + encodeURIComponent(userId);
    createUrl += "/playlists";

    // Create the playlist
    const createRequest = {
      name: playlistName,
    };
    const createResponse = await fetch(
      createUrl,
      this.headerPOST(createRequest)
    );
    const jsonCreateResponse = await createResponse.json();
    console.log("create playlist response >>>", jsonCreateResponse);

    // Add the tracks to the playlist
    const playlistId = jsonCreateResponse.id;

    let addUrl = baseUrl;
    addUrl += "/playlists";
    addUrl += "/" + encodeURIComponent(playlistId);
    addUrl += "/tracks";

    const addRequest = {
      uris: [...trackUris],
    };

    const addResponse = await fetch(addUrl, this.headerPOST(addRequest));
    console.log("add tracks response >>>", addResponse);

    if (addResponse.ok) {
      alert(`Playlist "${playlistName}" saved!`);
    } else {
      alert("Error saving playlist!");
    }
  },
};

export default Spotify;
