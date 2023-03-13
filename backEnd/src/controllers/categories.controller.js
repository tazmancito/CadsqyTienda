const { handleHttpError } = require("../utils/handleError.util");

const {
  getCategories,
  getSubcategories,
  getSubcategoriesByCategoriesDB,
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

/**
 * obtener todas las SubCategorias de una Categoria
 * @param req idCategoria padre
 * @param res  categorias
 */
const getSubCategoriesByCategory = async (req, res) => {
  try {
    let idFatherCategory = req.params.idFatherCategory;
    let result = await getSubcategoriesByCategoriesDB(idFatherCategory);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorGetSubCategoriesByCategory");
  }
};

module.exports = {
  getAllCategories,
  getAllSubCategories,
  getSubCategoriesByCategory,
};
