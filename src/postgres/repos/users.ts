import { IDatabase, IMain } from "pg-promise";

import { User } from "../../models/user";
import { users as sql } from "../sql";

export class UsersRepository {
  constructor(private db: IDatabase<any>, private pgp?: IMain) {}

  async add(user: User): Promise<User> {
    return this.db.one(sql.add, { ...user });
  }

  async find(email: any): Promise<User> {
    return this.db.one(sql.find, email);
  }

  async me(id: number): Promise<User> {
    return this.db.one(sql.me, { id });
  }
}
