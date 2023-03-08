const { handleHttpError } = require("../utils/handleError.util");

const {
  getCategories,
  getSubcategories,
} = require("../sentencesSQL/categories.sql");

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
    handleHttpError(res, "ErrorGetCategories");
  }
};

/**
 * obtener todas las SubCategorias
 * @param req
 * @param res  categorias
 */
const getAllSubCategories = async (req, res) => {
  try {
    let result = await getSubcategories();
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorGetSubCategories");
  }
};

module.exports = {
  getAllCategories,
  getAllSubCategories,
};
