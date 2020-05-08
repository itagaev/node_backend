import { IDatabase, IMain } from "pg-promise";
// import { IResult } from 'pg-promise/typescript/pg-subset';
import { Grain } from "../../models/grain";
import { grains as sql } from "../sql";

export class GrainRepository {
  constructor(private db: IDatabase<any>, private pgp?: IMain) {}

  async select(): Promise<Grain[]> {
    return this.db.any(sql.select);
  }

  async remove(id: number): Promise<null> {
    return this.db.oneOrNone(sql.remove, {
      id,
    });
  }

  async update(grain: Grain): Promise<Grain> {
    return this.db.one(sql.update, { ...grain });
  }

  async add(grain: Grain): Promise<Grain> {
    return this.db.one(sql.add, { ...grain });
  }

  async find(id: number): Promise<Grain> {
    return this.db.one(sql.find, { id });
  }
}
