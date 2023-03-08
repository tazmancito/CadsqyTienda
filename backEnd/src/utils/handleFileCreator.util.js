const fs = require("fs");

const { matchedData } = require("express-validator");

const createFile = ( req, res, next) => {

  
  try {

    let dir = "Public/" + req.body.userName;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

    return next(); // todo continua hacia el controlador
} catch (err) {
    res.status(403);
    res.send({ errors: err.array() })
}
};

module.exports = createFile
