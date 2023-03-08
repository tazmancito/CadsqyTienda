const { handleHttpError } = require("../utils/handleError.util");
const {
  getNombrePermisoByRolIdAndNombre,
} = require("../sentencesSQL/permissions.sql");

/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkPermissionsByRol = (permission) => async (req, res, next) => {
  try {
    const { user } = req;

    const permissions = await getNombrePermisoByRolIdAndNombre(
      user.RolId,
      permission
    );
    console.log(permissions)

    if (permissions.length == 0) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = { checkPermissionsByRol };
