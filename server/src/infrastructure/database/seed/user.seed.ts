import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../model/User";
import { Role } from "../../../domain/entities/user.entity";

export default class UserSeeder implements Seeder {
  track = true;
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        email: "biologist@mail.com",
        firstName: "Biologist",
        lastName: "Zero",
        password: "password",
        location: { type: "Point", coordinates: [-8.05, -34.900002] },
        role: Role.Biologist,
      },
      {
        email: "citizen@mail.com",
        firstName: "Citizen",
        lastName: "Zero",
        password: "password",
        location: { type: "Point", coordinates: [-42.8016, -5.08921] },
        role: Role.Citizen,
      },
    ]);
  }
}
