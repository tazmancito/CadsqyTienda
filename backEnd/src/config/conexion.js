const mysql = require("mysql2");

const { promisify } = require("util");

const HOST = process.env.HOST || "localhost";
const USERDB = process.env.USERDB || "";
const PASSWORD = process.env.PASSWORD || "";
const DATABASE = process.env.DATABASE || "";

/**
 * @description PROD
 */
const config = {
  host: HOST,
  user: USERDB,
  password: PASSWORD,
  database: DATABASE,
};

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (connection) connection.release();
  console.log("Database is connected");

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
