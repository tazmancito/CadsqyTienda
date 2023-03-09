const cdb = require("../config/conexion");

const searchProducts = async (word) => {
  const sentence =
    "SELECT * FROM Productos WHERE nombre like '%" + word + "%';";
  let result = await cdb.query(sentence);

  return result;
};

const updateProduct = async () => {};

const addProduct = async () => {};

const removeProduct = async () => {};

const getProducts = async () => {
  const sentence = "SELECT * FROM Productos;";
  let result = await cdb.query(sentence);

  return result;
};

const getProductsByOrderAleatory = async () => {
  const sentence = "SELECT * FROM Productos ORDER BY RAND() ;";
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

module.exports = {
  searchProducts,
  updateProduct,
  addProduct,
  removeProduct,
  getProducts,
  getProductsByOrderAleatory,
  getProductsByCategory,
};
