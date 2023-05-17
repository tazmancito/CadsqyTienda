const { handleHttpError } = require("../utils/handleError.util");

const sqlSentences = require("../sentencesSQL/cart.sql");
const { generateUUID } = require("../utils/handleUUID");

/**
 * obtener una categoria por su nombre
 * @param req
 * @param res  categorias
 */
const getCardByIdUser = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await sqlSentences.getCartByIdentifier(id);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ErrorGetCartById");
  }
};

/**
 * create cart ---------> si hay un cart con el deviceId crear otro deviceId
 * @param req
 * @param res  categorias
 */
const createCart = async (req, res) => {
  let cart = req.body;
  try {
    cart.deviceID = await generateUUID();
    await sqlSentences.addCart(cart);
    res.json({ idcart: cart.deviceID });
  } catch (e1) {
    if ((e1.code = "ER_DUPENTRY")) {
      try {
        let result = null;
        while (result == null) {
          cart.deviceID = await generateUUID();
          result = await sqlSentences.addCart(cart);
        }
        res.json({ idcart: cart.deviceID });
      } catch (e) {
        handleHttpError(res, "ErrorAddCart");
      }
    } else {
      handleHttpError(res, "ErrorAddCart");
    }
  }
};

const addProductCart = async (req, res) => {
  try {
    let data = req.body;
    let result = await sqlSentences.addCart(data);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ErrorAddProductCart");
  }
};

/**
 * obtener una categoria por su nombre
 * @param req
 * @param res  categorias
 */
const deleteCart = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await sqlSentences.deleteCart(id);
    if (result == null) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, "ErrorDeleteCart");
  }
};

module.exports = { getCardByIdUser, createCart, deleteCart, addProductCart };
