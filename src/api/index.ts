import { ENDPOINTS } from "./config";

export const fetchData = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getGrandmasters = async () => {
  try {
    return await fetchData(ENDPOINTS.GET_GRANDMASTERS());
  } catch (error) {
    console.error("Failed to fetch grandmasters:", error);
    throw error;
  }
};

export const getPlayerProfile = async (username: string) => {
  try {
    return await fetchData(ENDPOINTS.GET_PLAYER_PROFILE(username));
  } catch (error) {
    console.error(`Failed to fetch profile for ${username}:`, error);
    throw error;
  }
};