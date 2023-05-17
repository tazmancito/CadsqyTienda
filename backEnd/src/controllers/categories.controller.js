const { handleHttpError } = require("../utils/handleError.util");

const sqlSentences = require("../sentencesSQL/categories.sql");

/**
 * obtener una categoria por su nombre
 * @param req
 * @param res  categorias
 */
const getCategoryByName = async (req, res) => {
  try {
    let nombre = req.params.nombre;
    let result = await sqlSentences.getCategoryByNameDB(nombre);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorGetCategory");
  }
};

/**
 * obtener todas las categorias
 * @param req
 * @param res  categorias
 */
const getAllCategories = async (req, res) => {
  try {
    let result = await sqlSentences.getAllCategories();
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
    let result = await sqlSentences.getSubcategories();
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
    let result = await sqlSentences.getSubcategoriesByCategoriesDB(
      idFatherCategory
    );
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorGetSubCategoriesByCategory");
  }
};

/**
 * obtener la categoria especifica
 * @param req categoriaID
 * @param res  categorias
 */
const getCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await sqlSentences.getCategoryDB(id);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ErrorGetCategory");
  }
};

module.exports = {
  getAllCategories,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getCategory,
  getCategoryByName,
};
