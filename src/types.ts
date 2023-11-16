export enum Category {
  All = "All",
  NextMatch = "Next Match",
  Fixtures = "Fixtures",
  Squad = "Squad",
}

export type Country = {
  name: string;
  image_path: string;
};

export type Player = {
  id: string;
  name: string;
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
