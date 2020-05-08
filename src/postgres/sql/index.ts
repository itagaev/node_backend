import { QueryFile, IQueryFileOptions } from "pg-promise";
import path from "path";

const sql = (file: string): QueryFile => {
  const fullPath: string = path.join(__dirname, file);

  const options: IQueryFileOptions = {
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
};

export const grains = {
  select: sql("grains/select.sql"),
  remove: sql("grains/remove.sql"),
  update: sql("grains/update.sql"),
  add: sql("grains/add.sql"),
  find: sql("grains/find.sql")
};

export const users = {
  add: sql("users/add.sql"),
  find: sql("users/find.sql"),
  me: sql("users/me.sql")
};
