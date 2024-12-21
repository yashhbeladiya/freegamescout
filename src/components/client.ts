import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:5500";
const GAME_API = `${REMOTE_SERVER}/api/games`;

export const getGames = async () => {
  try {
    const response = await axios.get(GAME_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

export const getEpicGames = async () => {
  try {
    const response = await axios.get(`${GAME_API}/epic`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Epic games:", error);
  }
};

export const getPrimeGames = async () => {
  try {
    const response = await axios.get(`${GAME_API}/prime`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Prime games:", error);
  }
};

export const getSteamGames = async () => {
  try {
    const response = await axios.get(`${GAME_API}/steam`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Steam games:", error);
  }
};

export const getTopPicks = async () => {
  try {
    const response = await axios.get(`${GAME_API}/top-picks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top picks:", error);
  }
}

export const getSeachedGames = async (searchTerm: any) => {
  try {
    const response = await axios.get("/api/games/search", {
      params: { search: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};
