const multer = require("multer");
/***
 * configuracion de multer
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.routeFile);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    if (
      file.mimetype !== "application/x-msdos-program" &&
      ext !== "exe" &&
      ext !== "pdf"
    ) {
      let name = file.originalname.split(".").shift() + Date.now() + "." + ext;
      req.newFilesNames.push(name);
      cb(null, name);
    } else {
      cb(Error(" archivo no permitido").message, "");
    }
  },
});

const upload = multer({ storage: storage });

/**
 *  exportamos la funcion para subir el archivo
 */

exports.upload = upload.array("myFiles", 12);
