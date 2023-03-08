const cdb = require("../config/conexion");

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

module.exports = { getCategories, getSubcategories };
