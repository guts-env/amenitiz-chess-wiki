export interface IGrandmastersList {
  players: string[];
}

export interface IPlayerProfile {
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

export interface IPlayerCountry {
  '@id': string;
  code: string;
  name: string;
}