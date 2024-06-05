import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Point } from "geojson";

@Entity("migration_event")
export class Migration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  species!: string;

  @Column({ type: "timestamptz" })
  date!: Date;

  @Column({
    type: "geography",
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location!: Point;
}
