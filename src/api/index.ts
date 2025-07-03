import { ENDPOINTS } from "@/api/config";
import type { IGrandmastersList, IPlayerProfile } from '@/types/api';

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getGrandmasters: () => Promise<IGrandmastersList> = async () => {
  try {
    return await fetchData(ENDPOINTS.GET_GRANDMASTERS());
  } catch (error) {
    console.error("Failed to fetch grandmasters:", error);
    throw error;
  }
};

export const getPlayerProfile: (username: string) => Promise<IPlayerProfile> = async (username: string) => {
  try {
    return await fetchData(ENDPOINTS.GET_PLAYER_PROFILE(username));
  } catch (error) {
    console.error(`Failed to fetch profile for ${username}:`, error);
    throw error;
  }
};