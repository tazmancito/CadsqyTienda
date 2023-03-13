const cdb = require("../config/conexion");

const tableName = "Productos";

const searchProducts = async (word) => {
  const sentence =
    "SELECT * FROM Productos WHERE nombre like '%" + word + "%';";
  let result = await cdb.query(sentence);

  return result;
};

const updateProductDB = async (data, id) => {
  let result;
  let values = Object.values(data);

  let sentence = `UPDATE ${tableName} SET ProductosId=?, CategoriaId=?, nombre=?, descripcion=?, img=?, precio=? WHERE ProductosId=?`;
  result = cdb.query(sentence, [...values, id]);
  return result;
};

const addProductDB = async (data) => {
  let result;
  const values = Object.values(data);

  const sentence = `INSERT INTO ${tableName} (CategoriaId, nombre, descripcion, img, precio) VALUES(?, ?, ?, ?, ?)`;
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

const getProductsByCategory = async (categoria) => {
  const sentence =
    "SELECT * FROM Productos WHERE CategoriaId IN ( SELECT CategoriaId FROM Categoria WHERE Categoria.CategoriaPadreId IN (SELECT CategoriaId FROM Categoria WHERE Categoria.Nombre = '" +
    categoria +
    "') ) OR CategoriaId IN (SELECT CategoriaId FROM Categoria WHERE Categoria.Nombre = '" +
    categoria +
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
