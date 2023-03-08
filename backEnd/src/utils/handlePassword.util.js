const bcryptjs = require("bcryptjs");

/**
 * Contrase;a sin encriptar
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};

/**
 * Compara la version encriptada con una contrase;a dada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
  const result = await bcryptjs.compare(passwordPlain, hashPassword);
  return result;
};

module.exports = { encrypt, compare };
