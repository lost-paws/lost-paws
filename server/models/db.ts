import { Pool, QueryResult } from "pg";
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.PG_URI || '';

// elephantsql database
const pool = new Pool({ connectionString });

// pgAdmin database
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DB,
//   password: process.env.PG_PSWD,
//   port: 5432,
// });

export const db = {
  query: async (queryStr: string, values?: unknown[]): Promise<QueryResult<any>> => {
    console.log('executed query', queryStr);
    try {
      const result = await pool.query(queryStr, values);
      return result;
    } catch (error) {
      console.error('Error in db query:', error)
      throw error;
    }
  }
};
