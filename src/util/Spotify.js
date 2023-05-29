const redirectUri = "http://localhost:3000";
const baseUrl = "https://api.spotify.com/v1";
const searchUrl = "/search?type=track";

// Authorization
let accessToken = "";
const scope = "playlist-modify-public";
const clientId = "776ff261ab1d4cc28f40744d6c7f9064";
//const clientSecret = "833f8c585dd44d6a98d3ba4df55d6fc1";

let authorizeUrl = "https://accounts.spotify.com/authorize";
authorizeUrl += "?response_type=token";
authorizeUrl += "&client_id=" + encodeURIComponent(clientId);
authorizeUrl += "&scope=" + encodeURIComponent(scope);
authorizeUrl += "&redirect_uri=" + encodeURIComponent(redirectUri);

const Spotify = {
  getAuthHeaders() {
    if (!accessToken) {
      throw new ReferenceError("Access Token is NULL");
    }

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },

  getAccessToken() {
    if (accessToken) {
      return;
      //return accessToken;
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
        //return accessToken;
      } else {
        /*
        const authHeaders = { headers : { mode : 'no-cors' }};
        const response = await fetch(authorizeUrl);
        console.log(response);
        const jsonResponse = response.json();
        */
        window.location.replace(authorizeUrl);
      }
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
      const response = await fetch(queryUrl, this.getAuthHeaders());

      const jsonResponse = await response.json();
      console.log("jsonResponse:", jsonResponse);

      if (!jsonResponse.tracks.items.length) {
        throw new Error('No results found!');
      }
      const tracks = jsonResponse.tracks.items.map(item => {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
        };
      });

      console.log('formatted tracks:', tracks);
      return tracks;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;
