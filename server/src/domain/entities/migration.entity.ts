import { Point } from "geojson";
import { Migration as MigrationModel } from "../../infrastructure/database/model/Migration";

export interface MigrationJson {
  id?: number;
  species: string;
  date: string;
  location: { lat: number; lng: number };
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
    location: { lat: number; lng: number };
  }) {
    this.id = id;
    this.species = species;
    this.date = new Date(date);
    this.location = {
      type: "Point",
      coordinates: [location.lat, location.lng],
    };
  }

  setId(id: number) {
    this.id = id;
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
    const [lat, lng] = this.location.coordinates;
    return {
      id: this.id,
      species: this.species,
      date: this.date.toISOString(),
      location: { lat, lng },
    };
  }

  toPersistence() {
    return {
      id: this.id,
      species: this.species,
      date: this.date.toISOString(),
      location: this.location,
    };
  }

  static fromPersistence(model: MigrationModel) {
    const [lat, lng] = model.location.coordinates;
    return new Migration({ ...model, location: { lat, lng } });
  }
}
