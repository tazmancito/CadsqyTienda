const cdb = require("../config/conexion");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword.util");
const { tokenSing, verifyToken } = require("../utils/handleJwt.util");
const { handleHttpError } = require("../utils/handleError.util");

const {
  createUser,
  getUserByEmail,
  getUserById,
  getInfo,
} = require("../sentencesSQL/user.sql");
const emailer = require("../config/email");

const tableName = "Roles";

/**
 * registrar un usuario
 * @param {*}
 *
 */

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    let password = await encrypt(req.password);

    try {
      const user = { ...req, password };
      let insertUser = await createUser(user);

      // enviamos un mail de bienvenida al usuario
      //emailer.sendMail([user.email,process.env.USERMAIL])

      //generamos el token de sesion
      if (insertUser) {
        const temporalUser = await getUserById(insertUser.insertId);

        // const dataUser = {
        //   userId: temporalUser.UsuarioId
        // };

        // const data = {
        //   token: await tokenSing(dataUser),
        //   rol: dataUser.rol,
        // };
        //res.send({ data });
        res.send("usuario creado correctamente");
      }
    } catch (error) {
      handleHttpError(res, "ERROR_AL_CARGAR_USUARIO");
    }

    // en este punto pedimos de la base de datos el usuario y lo guadamos en dataUser ys solo sacamos el rol y el userID
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

/**
 *  login de un usuario
 * @param {*}
 *
 */
const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await getUserByEmail(req.email);
    if (!user) {
      handleHttpError(res, "USER_NOT_EXITS", 403);
      return;
    }

    // verificar si es usuario activo o no
    if (!user.Estado) {
      console.log(user.Estado);
      handleHttpError(res, "USER_NOT_ACTIVE", 403);
      return;
    }

    const hashPassword = user.Contrasenia;
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }
    const dataUser = {
      userId: user.UsuarioId,
    };
    const data = {
      token: await tokenSing(dataUser),
      Nombre: user.Nombre,
      UrlAvatar: user.UrlAvatar,
      Apellido: user.Apellido,
      correo: user.correo,
    };
    res.send(data);
  } catch (e) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

const verifyUserToken = async (req, res) => {
  const userToken = req.body;

  if (await verifyToken(userToken.token)) {
    let tokenData = await verifyToken(userToken.token);
    let user = await getUserById(tokenData.userId);
    if (user) {
      let dataUser = {
        userId: user.UsuarioId,
      };
      res.send({
        token: await tokenSing(dataUser),
      });
    } else {
      handleHttpError(res, "INVALID_USER");
    }
  } else {
    handleHttpError(res, "TOKEN_INVALID");
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userToken = req.body;
    if (await verifyToken(userToken.token)) {
      let tokenData = await verifyToken(userToken.token);
      let user = await getInfo(tokenData.userId);
      res.send(user[0]);
    } else {
      handleHttpError(res, "INVALID_USER");
    }
  } catch (error) {
    handleHttpError(res, "TOKEN_INVALID");
  }
};

module.exports = { registerUser, loginUser, verifyUserToken, getUserInfo };
