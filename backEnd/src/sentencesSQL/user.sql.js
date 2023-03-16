const cdb = require("../config/conexion");
const tableName = "Usuarios";
const createUser = async (user) => {
  let sentence =
    " INSERT INTO `Usuarios` (`Nombre`, `Apellido`, `FechaNacimiento`, `correo`, `Contrasenia`)";
  let values =
    " VALUES ('" +
    user.name +
    "', '" +
    user.lastName +
    "', '" +
    user.bornDay +
    "','" +
    user.email +
    "', '" +
    user.password +
    "');";
  //guardamos en la base de datos
  let insertUser = await cdb.query(sentence + values);
  return insertUser;
};

const getUserByEmail = async (email) => {
  try {
    let sentence = "SELECT * FROM `Usuarios` WHERE `correo` = '" + email + "'";

    let result = await cdb.query(sentence);
    if (result.length == 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserById = async (idUser) => {
  try {
    let sentence =
      "SELECT * FROM `Usuarios` WHERE `UsuarioId` = " + idUser + ";";

    let result = await cdb.query(sentence);

    if (result.length == 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateRol = async (RolId, id) => {
  try {
    let result;
    let sentence =
      "UPDATE " +
      tableName +
      " SET RolId = " +
      RolId +
      " WHERE UsuarioId = " +
      id;
    result = cdb.query(sentence);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateState = async (state, id) => {
  try {
    let result;
    let sentence =
      "UPDATE " +
      tableName +
      " SET Estado = " +
      state +
      " WHERE UsuarioId = " +
      id;
    result = cdb.query(sentence);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getInfo = async (id) => {
  try {
    let result;
    let sentence = `SELECT Usuarios.Nombre AS Nombre,
    Usuarios.Apellido AS Apellido, Roles.Nombre AS Rol,
    Usuarios.correo, Usuarios.Estado
    FROM Usuarios 
    LEFT JOIN Roles ON
    (Roles.RolId = Usuarios.RolId) WHERE UsuarioId = ${id}`;
    result = cdb.query(sentence);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteUserDB = async (id) => {
    let result;
    let sentence = `DELETE FROM Usuarios WHERE UsuarioId = ${id};`;
    result = await cdb.query(sentence);
    return result;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateRol,
  updateState,
  getInfo,
  deleteUserDB,
};
