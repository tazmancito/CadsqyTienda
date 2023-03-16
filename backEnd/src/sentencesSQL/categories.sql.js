const cdb = require("../config/conexion");
const tableName = "Categorias";
const getCategoryDB = async (categoryId) => {
  const sentence = `SELECT * FROM ${tableName} WHERE CategoriasId = ${categoryId} ;`;
  let result = await cdb.query(sentence);

  return result;
};

const getCategories = async () => {
  const sentence = `SELECT * FROM ${tableName} WHERE EsPadre = true;`;
  let result = await cdb.query(sentence);

  return result;
};

const getSubcategories = async () => {
  const sentence = `SELECT * FROM ${tableName} WHERE EsPadre = false;`;
  let result = await cdb.query(sentence);

  return result;
};

const getSubcategoriesByCategoriesDB = async (categoryFatherId) => {
  const sentence = `SELECT * FROM ${tableName} WHERE CategoriasPadreId = ${categoryFatherId} ;`;
  let result = await cdb.query(sentence);

  return result;
};

module.exports = {
  getCategories,
  getSubcategories,
  getSubcategoriesByCategoriesDB,
  getCategoryDB,
};
