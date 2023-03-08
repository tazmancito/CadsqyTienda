const cdb = require("../config/conexion");

const getPermissionsByRolId = async (rolId) => {
  try {
    let sentence =
      "SELECT Nombre FROM `Permisos` WHERE `RolId` = " + rolId + ";";
    let result = await cdb.query(sentence);
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getNombrePermisoByRolIdAndNombre = async (rolId, Nombre) => {
  try {
    let sentence =
      "SELECT Nombre FROM `Permisos` WHERE `RolId` = " +
      rolId +
      " AND `Nombre` = '" +
      Nombre +
      "';";
    let result = await cdb.query(sentence);
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { getPermissionsByRolId, getNombrePermisoByRolIdAndNombre };
