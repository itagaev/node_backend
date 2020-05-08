import { GrainRepository } from "./grains";
import { UsersRepository } from "./users";

interface Extensions {
  grains: GrainRepository;
  users: UsersRepository;
}

export { Extensions, GrainRepository, UsersRepository };
