import * as pg from "pg";
import "dotenv/config";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export { connectionPool };
