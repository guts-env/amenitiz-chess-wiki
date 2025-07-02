const BASE_URL = "https://api.chess.com/pub";

const ENDPOINTS = {
  GET_GRANDMASTERS: () => `${BASE_URL}/titled/GM`,
  GET_PLAYER_PROFILE: (username: string) => `${BASE_URL}/player/${username}`,
} as const;

export { BASE_URL, ENDPOINTS };