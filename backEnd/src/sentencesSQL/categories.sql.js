const cdb = require("../config/conexion");

const getCategories = async () => {
  const sentence = "SELECT nombre FROM Categoria ORDER BY nombre;";
  let result = await cdb.query(sentence);

  return result;
};

module.exports = { getCategories };
