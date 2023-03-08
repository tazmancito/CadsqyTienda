const { handleHttpError } = require("../utils/handleError.util");

const verifyFilesUpload = (req, res, next) => {
  
    // handleHttpError(res, "Error en la peticion");
    console.log(req)
    return next();
};

module.exports = verifyFilesUpload;
