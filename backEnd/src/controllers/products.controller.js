const { handleHttpError } = require("../utils/handleError.util");

const {
  searchProducts,
  getProductsByOrderAleatory,
  getProductsByCategory,
  getProducts,
  getProductByID,
  addProductDB,
  updateProductDB,
  removeProductDB,
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
 * obtener todos los productos disponibles
 * @param req
 * @param res  todos los productos de la tienda
 */
const getProductsDB = async (req, res) => {
  try {
    let word = req.params.word;
    let result = await getProducts();
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorSearchProducts");
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

/**
 * obtener producto por id
 * @param req
 * @param res  todos los producto solicitado
 */
const getProductById = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await getProductByID(id);
    if (result == null) {
      res.json([]);
    } else {
      console.log(result);
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorSearchProductById");
  }
};

/**
 * agregar producto
 * @param req objeto producto
 * @param res
 */
const addProduct = async (req, res) => {
  try {
    const values = Object.values(req.body);
    let result = await addProductDB(values);
    res.json({ message: "producto agregado conexito" });
  } catch (error) {
    handleHttpError(res, "ErrorAddProduct");
  }
};

/**
 * modificar producto
 * @param req objeto producto
 * @param res
 */
const updateProduct = async (req, res) => {
  try {
    const values = Object.values(req.body);
    let ID = req.params.id;
    let result = await updateProductDB(values, ID);
    res.json({ message: "producto actualizado con exito conexito" });
  } catch (error) {
    handleHttpError(res, "ErrorUpdateProduct");
  }
};

/**
 * eliminar producto
 * @param req id del producto
 * @param res
 */
const deleteProduct = async (req, res) => {
  try {
    let ID = req.params.id;
    let result = await removeProductDB(ID);
    res.json({ message: "eliminado con exito" });
  } catch (error) {
    handleHttpError(res, "ErrorDeleteProduct");
  }
};

module.exports = {
  getProductByName,
  getProductsAletoryOrder,
  getAllProductsByCategory,
  getProductsDB,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
