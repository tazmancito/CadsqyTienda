const { handleHttpError } = require("../utils/handleError.util");

const {
  searchProducts,
  getProductsByOrderAleatory,
  getProductsByCategory,
} = require("../sentencesSQL/product.sql");

/**
 * obtener una busqueda de productos que contengan la palabra buscada
 * @param req  nombre de producto que se busca
 * @param res  productos con nombres similares o iguales
 */
const getProductByName = async (req, res) => {
  try {
    let word = req.params.word;
    let result = await searchProducts(word);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorSearchProduct");
  }
};

/**
 * obtener todos los productos disponibles en ordenados de forma aleatoria
 * @param req
 * @param res  todos los productos de la tienda mostrados de forma aleatoria
 */
const getProductsAletoryOrder = async (req, res) => {
  try {
    let word = req.params.word;
    let result = await getProductsByOrderAleatory();
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorSearchProductAleatory");
  }
};

/**
 * obtener todos los productos por categoria
 * @param req
 * @param res  todos los productos de la categoria solicitada
 */
const getAllProductsByCategory = async (req, res) => {
  try {
    let categoria = req.params.categoria;
    let result = await getProductsByCategory(categoria);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorSearchProductByCategory");
  }
};

module.exports = {
  getProductByName,
  getProductsAletoryOrder,
  getAllProductsByCategory,
};
