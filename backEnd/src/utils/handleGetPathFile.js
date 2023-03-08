const getPathFile = async (req, res) => {
  let routes = [];

  if (req.files) {
    let relativePath = req.routeFile.split(process.env.CARPETAPRINCIPAL).pop();
    let nombreDominio = "https://" + process.env.NOMBREDOMINIO;

    if (req.newFilesNames.length > 0) {
      let path;
      for (let fileName of req.newFilesNames) {
        path = nombreDominio + relativePath + "/" + fileName;

        routes.push(path);
      }
    } else {
      for (let file of req.files) {
        path = nombreDominio + relativePath + "/" + file.originalname;
        routes.push(path);
      }
    }

    if (req.files.length == 1) {
      res.send({ message: "Se subio un archivo", data: routes[0] });
    } else {
      res.send({
        message: "Se subieron " + req.files.length + " archivos",
        data: routes,
      });
    }
  } else {
    res.send({
      message: "Se subieron " + req.files.length + " archivos",
      data: routes,
    });
  }
};

module.exports = { getPathFile };
