export enum Category {
  All = "All",
  UpcomingMatches = "Upcoming Matches",
  PrevFixtures = "Previous Fixtures",
  Squad = "Squad",
}

export type Country = {
  name: string;
  image_path: string;
};

export type Player = {
  id: string;
  name: string;
  date_of_birth: string;
  image_path: string;
  jersey_number: number;
  position: string;
  country: Country;
};

export type Team = {
  id: string;
  name: string;
  image_path: string;
  players: Player[];
};

export type League = {
  name: string;
  image_path: string;
};

export type Participant = {
  name: string;
  image_path: string;
};

export enum Location {
  Home = "home",
  Away = "away",
}

export enum Result {
  Win = "win",
  Loss = "loss",
  Draw = "draw",
}

export type Fixture = {
  name: string;
  starting_at: string;
  league: League;
  venue: string;
  location: Location;
  result?: Result;
  participants: {
    host: Participant;
    away: Participant;
  };
  score?: {
    host_goals: number;
    away_goals: number;
  };
};
