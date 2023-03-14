const cdb = require("../config/conexion");
const { handleHttpError } = require("../utils/handleError.util");
const tableName = "User";
const { verifyToken } = require("../utils/handleJwt.util");
const { updateRol, updateState, getInfo } = require("../sentencesSQL/user.sql");

/**
 * crear usuario
 * @param req
 * @param res
 */
const createUser = (req, res) => {
  try {
    const data = req.body;
    next();
  } catch (e) {
    handleHttpError(res, "ErrorCReateUser");
  }
  res.json(req.body.name);
};

/**
 * Actualizar Rol user
 * @param req
 * @param res
 */
const updateRolUser = async (req, res) => {
  try {
    const RolId = req.body.rol;
    let ID = req.params.id;
    const result = await updateRol(RolId, ID);

    if (result.affectedRows > 0) {
      res.json({ message: "Actualizado con exito" });
    } else {
      res.json({ message: "error al actualizar" });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * disabled user
 * @param req
 * @param res
 */
const disabledUser = async (req, res) => {
  try {
    let ID = req.params.id;
    const result = await updateState(0, ID);
    if (result.affectedRows > 0) {
      res.json({ message: "Actualizado con exito" });
    } else {
      res.json({ message: "error al actualizar" });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * enabled user
 * @param req
 * @param res
 */
const enabledUser = async (req, res) => {
  try {
    let ID = req.params.id;
    const result = await updateState(1, ID);

    if (result.affectedRows > 0) {
      res.json({ message: "Actualizado con exito" });
    } else {
      res.json({ message: "error al actualizar" });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * enabled user
 * @param req
 * @param res
 */
const getUserInfo = async (req, res) => {
  try {
    let tokenData = await verifyToken(req.body.token);
    if (tokenData) {
      const result = await getInfo(tokenData.userId);
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.json({ message: "error al obtener la información" });
      }
    } else {
      handleHttpError(res, "ErrorInvalidToken");
    }
  } catch (error) {
    handleHttpError(res, "ErrorGetInfoUser");
  }
};

module.exports = {
  createUser,
  updateRolUser,
  disabledUser,
  enabledUser,
  getUserInfo,
};
