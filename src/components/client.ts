import axios from "axios";

// Remote server (set REACT_APP_REMOTE_SERVER to your ngrok HTTPS url when using ngrok)
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:5500";
const GAME_API = `${REMOTE_SERVER.replace(/\/+$/g, "")}/api/games`;

// Create an axios instance with a baseURL and a JSON Accept header to encourage the server
// to return JSON instead of any HTML interstitials some proxies may return.
const api = axios.create({
  baseURL: GAME_API,
  headers: {
    Accept: "application/json, text/plain, */*",
  // When using ngrok free tunnels, ngrok may return an HTML interstitial for
  // non-interactive requests; this header tells ngrok to skip that browser warning.
  "ngrok-skip-browser-warning": "1",
  },
  // keep credentials disabled by default; enable if your API needs cookies
});

export const getGames = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

export const getEpicGames = async () => {
  try {
    const response = await api.get("/epic");
    console.log("Epic games fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Epic games:", error);
  }
};

export const getPrimeGames = async () => {
  try {
    const response = await api.get("/prime");
    return response.data;
  } catch (error) {
    console.error("Error fetching Prime games:", error);
  }
};

export const getSteamGames = async () => {
  try {
    const response = await api.get("/steam");
    return response.data;
  } catch (error) {
    console.error("Error fetching Steam games:", error);
  }
};

export const getGOGGames = async () => {
  try {
    const response = await api.get("/gog");
    return response.data;
  } catch (error) {
    console.error("Error fetching GOG games:", error);
  }
}

export const getTopPicks = async () => {
  try {
    const response = await api.get("/top-picks");
    return response.data;
  } catch (error) {
    console.error("Error fetching top picks:", error);
  }
}

export const getSeachedGames = async (searchTerm: any) => {
  try {
    const response = await api.get("/search", {
      params: { search: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};
