export interface GrandmastersList {
  players: string[];
}

export interface PlayerProfile {
  username: string;
  title: string;
  country: string;
  followers: number;
  league: string;
  status: string;
  verified: boolean;
  is_streamer: boolean;
  joined: number;
  last_online: number;
  url: string;
}

export interface PlayerCountry {
  '@id': string;
  code: string;
  name: string;
}