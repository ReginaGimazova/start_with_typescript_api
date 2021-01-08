import {promisify} from "util";
import { Connection } from 'mysql';
import DBConnection from "../databaseAccess/DBConnection";

function getConnection(): Connection {
  const dbConnection = new DBConnection();
  return dbConnection.createToolConnection();
}

function getAsyncQuery() {
  const connection = getConnection();
  return {query: promisify(connection.query).bind(connection), connection};
}

export default getAsyncQuery;