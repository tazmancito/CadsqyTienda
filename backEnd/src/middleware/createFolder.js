const fs = require("fs");

/**
 * Ruta a la que se debe almacenar el archivo
 * @param {*} rutaFileUpload
 * @returns
 */
const createFolder = () => async (req, res, next) => {


  next();
};

module.exports = { createFolder };
