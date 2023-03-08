const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * debes pasar el objeto usuario
 * @param {*} user
 */
const tokenSing = async (user) => {

   const sing = await jwt.sign(
    {
      userId: user.userId
    },
    JWT_SECRET,
    // tiempo de expiracion
    {
      expiresIn: "24h",
    }
  );
  return sing;
};

/**
 * Debes pasar el token de session de JWT
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = { tokenSing, verifyToken };
