const { handleHttpError } = require("../utils/handleError.util");

/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.rol;
    //verifica si dentro del array de la ruta, se encuentra al menos un rol del usuario
    const checkValueRol = roles.some((rol) => rolesByUser.includes(rol));
    //const checkValueRol = true;
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS");
      return;
    }

    next();
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = { checkRol };
