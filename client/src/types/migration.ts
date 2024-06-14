import { Location } from "./location";

export interface Migration {
  id: number;
  species: string;
  date: string;
  location: Location;
}

export interface MigrationForm {
  species: string;
  date: string;
  location: Location | undefined;
}
