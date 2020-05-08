import pgPromise, { IInitOptions, IDatabase, IMain } from "pg-promise";
import promise from "bluebird";

import { Extensions, GrainRepository, UsersRepository } from "./repos";

type ExtendedProtocol = IDatabase<Extensions> & Extensions;

const initOptions: IInitOptions<Extensions> = {
  promiseLib: promise,

  extend(obj: ExtendedProtocol) {
    obj.grains = new GrainRepository(obj);
    obj.users = new UsersRepository(obj)
  }
};

const pgp: IMain = pgPromise(initOptions);

const db: ExtendedProtocol = pgp(
  `postgres://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

export { db, pgp };
