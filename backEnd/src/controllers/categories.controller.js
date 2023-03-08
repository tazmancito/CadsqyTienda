const { handleHttpError } = require("../utils/handleError.util");

const { getCategories } = require("../sentencesSQL/categories.sql");

/**
 * obtener todas las categorias
 * @param req
 * @param res  categorias
 */
const getAllCategories = async (req, res) => {
  try {
    let result = await getCategories();
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorSearchProduct");
  }
};

module.exports = {
  getAllCategories,
};
