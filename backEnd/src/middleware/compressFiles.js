const AdmZip = require("adm-zip");
const pathFiles = "../" + process.env.NOMBREDOMINIO + "/assets/blogs/images";
/**
 * Ruta a la que se debe almacenar el archivo
 * @param {*} pathFiles
 * @returns
 */
const compressFiles = (pathFiles) => async (req, res, next) => {
  let zip = new AdmZip();

  // add file directly
  let content = "archivos comprimidos";
  // zip.addFile("prueza.zip", Buffer.from(content, "utf8"), "ningun archivo fue analizado por ningun antivirus");
  // add local file
  zip.addLocalFile(pathFiles + "/taz.txt");
  // get everything as a buffer
  let willSendthis = zip.toBuffer();
  // or write everything to disk
  zip.writeZip(pathFiles +"/taz.zip");
  next();
};

module.exports = { compressFiles };
