import { Point } from "geojson";

export interface MigrationJson {
  id?: number;
  species: string;
  date: string;
  location: Point;
}

export class Migration {
  private id?: number;
  private species: string;
  private date: Date;
  private location: Point;

  constructor({
    id,
    species,
    date,
    location,
  }: {
    id?: number;
    species: string;
    date: Date | string;
    location: Point | string;
  }) {
    this.id = id;
    this.species = species;
    this.date = new Date(date);
    this.location =
      typeof location === "string"
        ? {
            type: "Point",
            coordinates: location.split(",").map(Number),
          }
        : location;
  }

  getId(): number | undefined {
    return this.id;
  }

  getSpecies(): string {
    return this.species;
  }

  getDate(): Date {
    return this.date;
  }

  toJson(): MigrationJson {
    return {
      id: this.id,
      species: this.species,
      date: this.date.toISOString(),
      location: this.location,
    };
  }
}
