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
// In-memory cache to reduce HTTP requests to the free backend
let gamesCache: { ts: number; data: any[] | null } = { ts: 0, data: null };
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes
let inflightFetch: Promise<any[]> | null = null;

const fetchAllGames = async (): Promise<any[]> => {
  const now = Date.now();
  if (gamesCache.data && now - gamesCache.ts < CACHE_TTL) {
    return gamesCache.data as any[];
  }

  // If there's already a fetch in progress, return the same promise so concurrent callers
  // don't trigger multiple HTTP requests.
  if (inflightFetch) return await inflightFetch;

  inflightFetch = (async () => {
    try {
      const response = await api.get("/");
      const data = response.data;
      gamesCache = { ts: Date.now(), data };
      return data;
    } catch (error) {
      console.error("Error fetching all games:", error);
      // return empty array on error so callers always get an array
      return [];
    } finally {
      // clear inflight regardless so future calls can retry
      inflightFetch = null;
    }
  })();

  return await inflightFetch;
};

export const invalidateGamesCache = () => {
  gamesCache = { ts: 0, data: null };
};

export const getGames = async () => {
  return await fetchAllGames();
};

// Platform-specific helpers now filter the cached/full dataset client-side
export const getEpicGames = async () => {
  try {
    const all = await fetchAllGames();
    const filtered = (all || []).filter((g: any) => g.platform?.toLowerCase() === "epic");
    console.log("Epic games fetched successfully:", filtered);
    return filtered;
  } catch (error) {
  console.error("Error fetching Epic games:", error);
  return [];
  }
};

export const getPrimeGames = async () => {
  try {
    const all = await fetchAllGames();
    return (all || []).filter((g: any) => g.platform?.toLowerCase() === "prime gaming");
  } catch (error) {
  console.error("Error fetching Prime games:", error);
  return [];
  }
};

export const getSteamGames = async () => {
  try {
    const all = await fetchAllGames();
    return (all || []).filter((g: any) => g.platform?.toLowerCase() === "steam");
  } catch (error) {
  console.error("Error fetching Steam games:", error);
  return [];
  }
};

export const getGOGGames = async () => {
  try {
    const all = await fetchAllGames();
    return (all || []).filter((g: any) => g.platform?.toLowerCase() === "gog" || g.platform?.toLowerCase() === "gog.com");
  } catch (error) {
  console.error("Error fetching GOG games:", error);
  return [];
  }
}

export const getTopPicks = async () => {
  try {
    const all = await fetchAllGames();
    return (all || []).filter((g: any) => Array.isArray(g.tags) && g.tags.includes("top-pick"));
  } catch (error) {
  console.error("Error fetching top picks:", error);
  return [];
  }
}

// Search remains a server-side endpoint to reduce client CPU and to allow full-text search
export const getSeachedGames = async (searchTerm: any) => {
  try {
    const response = await api.get("/search", {
      params: { search: searchTerm },
    });
    return response.data;
  } catch (error) {
  console.error("Error fetching games:", error);
  return [];
  }
};
