const cdb = require("../config/conexion");

const tableName = "Cart";

const addCart = async (data) => {
  let result;
  const values = Object.values(data);

  const sentence = `INSERT INTO ${tableName} (deviceID, ProductosId, cantidad) VALUES ( ?, ?, ?)`;
  result = cdb.query(sentence, values);
  return result;
};

const getCartByIdentifier = async (identifier) => {
  const sentence = `SELECT * FROM ${tableName} WHERE deviceID = ${identifier}`;
  let result = await cdb.query(sentence);

  return result;
};

const deleteCart = async (id) => {
  const sentence = `DELETE FROM ${tableName} WHERE CartId = ${id}`;
  let result = await cdb.query(sentence);

  return result;
};

module.exports = { addCart, getCartByIdentifier, deleteCart };
