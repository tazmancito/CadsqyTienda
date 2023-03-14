const cdb = require("../config/conexion");

const getCategoryDB = async (categoryId) => {
  const sentence =
    "SELECT * FROM `Categoria` WHERE CategoriaId =" + categoryId + ";";
  let result = await cdb.query(sentence);

  return result;
};

const getCategories = async () => {
  const sentence = "SELECT * FROM `Categoria` WHERE EsPadre = true;";
  let result = await cdb.query(sentence);

  return result;
};

const getSubcategories = async () => {
  const sentence = "SELECT * FROM `Categoria` WHERE EsPadre = false;";
  let result = await cdb.query(sentence);

  return result;
};

const getSubcategoriesByCategoriesDB = async (categoryFatherId) => {
  const sentence =
    "SELECT * FROM `Categoria` WHERE CategoriaPadreId = " +
    categoryFatherId +
    ";";
  let result = await cdb.query(sentence);

  return result;
};

module.exports = {
  getCategories,
  getSubcategories,
  getSubcategoriesByCategoriesDB,
  getCategoryDB,
};
