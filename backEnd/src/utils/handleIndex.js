import * as CryptoJS from "crypto-js";
const secretKey = process.env.JWT_SECRET; // La clave secreta que se usará para cifrar y descifrar
/**
 * convierte el inde a un string encriptado
 * @param {number} index
 */
const encryptIndex = async (index) => {
  const encryptedNumber = CryptoJS.AES.encrypt(
    index.toString(),
    secretKey
  ).toString();

  return encryptedNumber;
};

/**
 * retorna el index desencriptado
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const decryptIndex = async (index) => {
  const bytes = CryptoJS.AES.decrypt(index, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
};

module.exports = { encryptIndex, decryptIndex };
