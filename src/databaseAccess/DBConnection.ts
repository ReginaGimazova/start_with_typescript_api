import { Connection, createConnection } from 'mysql';
// tslint:disable-next-line:no-var-requires
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

const connectionConfig = {
  host: DB_HOST,
  port: 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
};

/**
 * connectionConfig - connection config to the database of this tool
 */

class DBConnection {
  createToolConnection(): Connection {
    const connection = createConnection({
      ...connectionConfig,
    });
    connection.query('set autocommit=false');

    return connection;
  }
}

export default DBConnection;
