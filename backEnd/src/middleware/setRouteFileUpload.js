const fs = require("fs");
/**
 * Ruta en la que se debe almacenar el archivo
 * @param {*} rutaFileUpload
 * @returns
 */
const setRouteFile = (rutaFileUpload) => async (req, res, next) => {
  req.routeFile = rutaFileUpload;
  req.newFilesNames = [];

  //crea las carpetas necesarias para guardar los archivos si no exitieran
  let dir = rutaFileUpload;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

  next();
};

module.exports = { setRouteFile };
