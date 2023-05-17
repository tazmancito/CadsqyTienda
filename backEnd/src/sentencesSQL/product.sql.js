const cdb = require("../config/conexion");

const tableName = "Productos";

const searchProducts = async (word) => {
  // const sentence =
  //   `SELECT * FROM ${tableName} WHERE nombre like '%${word}%'`;
    let sentence =`SELECT * FROM ${tableName} WHERE nombre REGEXP '[[:<:]]${word}[[:>:]]'`;
  let result = await cdb.query(sentence);

  return result;
};

const updateProductDB = async (data, id) => {
  let result;
  let values = Object.values(data);

  let sentence = `UPDATE ${tableName} SET ProductosId=?, CategoriasId=?, nombre=?, descripcion=?, img=?, precio=? WHERE ProductosId=?`;
  result = cdb.query(sentence, [...values, id]);
  return result;
};

const addProductDB = async (data) => {
  let result;
  const values = Object.values(data);

  const sentence = `INSERT INTO ${tableName} (CategoriasId, nombre, descripcion, img, precio) VALUES(?, ?, ?, ?, ?)`;
  result = cdb.query(sentence, values);
  return result;
};

const removeProductDB = async (id) => {
  const sentence = `DELETE FROM ${tableName} WHERE ProductosId = ${id};`;
  let result = await cdb.query(sentence);

  return result;
};

const getProducts = async () => {
  const sentence = `SELECT * FROM ${tableName} ;`;
  let result = await cdb.query(sentence);

  return result;
};

const getProductsByOrderAleatory = async () => {
  const sentence = `SELECT * FROM ${tableName} ORDER BY RAND() ;`;
  let result = await cdb.query(sentence);

  return result;
};

const getProductsByCategory = async (Categorias) => {
  const sentence =
    "SELECT * FROM Productos WHERE CategoriasId IN ( SELECT CategoriasId FROM Categorias WHERE Categorias.CategoriasPadreId IN (SELECT CategoriasId FROM Categorias WHERE Categorias.Nombre = '" +
    Categorias +
    "') ) OR CategoriasId IN (SELECT CategoriasId FROM Categorias WHERE Categorias.Nombre = '" +
    Categorias +
    "') ";
  let result = await cdb.query(sentence);

  return result;
};

const getProductByID = async (id) => {
  const sentence = "SELECT * FROM Productos WHERE ProductosId = " + id + ";";
  let result = await cdb.query(sentence);

  return result;
};

module.exports = {
  searchProducts,
  updateProductDB,
  addProductDB,
  removeProductDB,
  getProducts,
  getProductsByOrderAleatory,
  getProductsByCategory,
  getProductByID,
};
