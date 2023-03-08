const { handleHttpError } = require("../utils/handleError.util");
const { verifyToken } = require("../utils/handleJwt.util");
const { getUserById } = require("../sentencesSQL/user.sql");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_SESSION", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    dataToken = await verifyToken(token);

    if (!dataToken.userId) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }
    const user = await getUserById(dataToken.userId);
    // solicitar por id al usuario que esta con session iniciada apartir de dataToken.userId

    const data = {
      token: token,
      RolId: user.RolId,
      Nombre: user.Nombre,
      UrlAvatar: user.UrlAvatar,
      ApellidoPaterno: user.ApellidoPaterno,
      ApellidoMaterno: user.ApellidoMaterno,
      correo: user.correo,
    };
    req.user = data;
 

    // aqui pasamos al ,req el uaurio con session iniciada
    next();
  } catch (e) {
    handleHttpError(res, "NOT_AUTHORIZED_BY_CADS", 401);
  }
};

module.exports = { authMiddleware };
