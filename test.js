(async () => {
  const token =
    "BQAPXB9hAS8-ODt_A7HIERBlRJPOq76XSP6SN4UAAgQnE69mzdYG4Z9HhL_snDhFdKWQQvdkH7V0j6KQP2IJ0-gODO8uiO49ZdF15NfyCmiAjVCV7xos9dltFaol7IG3eAb2QywQlM498JFlQ-ca_QTNqJv_teE-BMW9A-PsUcNcG9h31D__NKwRFypDZx-a7DCoFwF-rImAXl9sSMUoI2qz8iWsK3MTJPOzwL3KnhiAG4VQJkreAsPE6rTDdg3F9A9S1vO5nyvZu5UqDLadxHbcJQ";
  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (
      await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=15", "GET")
    ).items;
  }

  const topTracks = await getTopTracks();
  console.log(
    topTracks?.map(
      ({ name, artists }) =>
        `${name} by ${artists.map((artist) => artist.name).join(", ")}`
    )
  );
})();
