import React, { useEffect, useState } from "react";

// Replace with your Spotify app credentials
const client_id = process.env.REACT_APP_CLIENT_ID as string;
const client_secret = process.env.REACT_APP_CLIENT_SECRET as string;
const _refreshToken = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN as string;

const isTokenExpired = (): boolean => {
  const expiresAt = localStorage.getItem("expiresAt");
  const access_token = localStorage.getItem("access_token");

  if (!expiresAt || !access_token) {
    return true;
  }

  const now = Date.now();
  return now > parseInt(expiresAt);
};

const fetchPlayingNow = async () => {
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data.error) {
      console.error("Error fetching currently playing track:", data.error);
      return null;
    }

    return data.item;
  } catch (error) {}
};

const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token") || _refreshToken;

  if (!refresh_token) {
    throw new Error("No refresh token available");
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    client_id: client_id,
    client_secret: client_secret,
  });

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem(
      "expiresAt",
      (Date.now() + data.expires_in * 1000).toString()
    );

    return data.access_token;
  } catch (error) {
    console.error("Error refreshing the access token:", error);
    return null;
  }
};

const fetchTopTracks = async () => {
  const fetchWebApi = async (endpoint: string, method: string) => {
    if (isTokenExpired()) {
      await refreshToken();
    }

    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      throw new Error("Unable to retrieve access token.");
    }

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  };

  const topTracks = await (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=10", "GET")
  ).items;

  if (topTracks && topTracks.length > 0) {
    return topTracks;
  }
};

export default fetchTopTracks;
export { fetchPlayingNow };
