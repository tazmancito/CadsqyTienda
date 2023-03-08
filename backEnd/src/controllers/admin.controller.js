const cdb = require("../config/conexion");
const { handleHttpError } = require("../utils/handleError.util");
const {
  getBlogReview,
  getBlogsReview,
  getFullNameUser,
  getAmountBlogsReview,
  getBlogsRefused,
  getBlogsAccepted,
  setBackgroundById,
  getBackgroundById,
} = require("../sentencesSQL/adminQuery.sql");

/**
 * obtener blog para revisar por id
 * @param req
 * @param res
 */
const getBlogReviewAdmin = async (req, res) => {
  let ID = req.params.id;
  let result = await getBlogReview(ID);
  res.json(result);
};

/**
 * obtener background por id
 * @param req
 * @param res
 */
const getBackground = async (req, res) => {
  let ID = req.params.id;
  let result = await getBackgroundById(ID);
  res.json(result[0]);
};

/**
 * cambiar background de componente
 * @param req
 * @param res
 */
const setBackground = async (req, res) => {
  try {
    const data = req.body;
    let result = await setBackgroundById(data);
    res.json(result);
  } catch (error) {
    handleHttpError(res, "ErrorCReateUser");
    res.json("error al agregar fondo");
  }
};

/**
 * obtener blogs para revisar
 * @param req
 * @param res
 */
const getBlogsReviewAdmin = async (req, res) => {
  let result = await getBlogsReview();
  res.json(result);
};

/**
 * obtener blogs rechazados
 * @param req
 * @param res
 */
const getBlogsRefusedAdmin = async (req, res) => {
  let result = await getBlogsRefused();
  res.json(result);
};

/**
 * obtener blogs aceptados
 * @param req
 * @param res
 */
const getBlogsAcceptedAdmin = async (req, res) => {
  let result = await getBlogsAccepted();
  res.json(result);
};

/**
 * obtener nombre completo del usuario
 * @param req
 * @param res
 */
const getUserFullNameById = async (req, res) => {
  let ID = req.params.id;

  let result = await getFullNameUser(ID);
  res.json(result);
};

/**
 * obtener numero de blogs para revisar por id
 * @param req
 * @param res
 */
const getAmountBlogReviewAdmin = async (req, res) => {
  let result = await getAmountBlogsReview();
  res.json(result);
};

module.exports = {
  getBlogReviewAdmin,
  getBlogsReviewAdmin,
  getUserFullNameById,
  getAmountBlogReviewAdmin,
  getBlogsRefusedAdmin,
  getBlogsAcceptedAdmin,
  setBackground,
  getBackground,
};
