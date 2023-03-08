const cdb = require("../config/conexion");
const tableName = "EnlacesPiePagina";

/**
 * Obtener enlaces pie pagina
 * @param req
 * @param res
 */
const getLinksHeadersFooter = (req, res) => {
  const sql = "SELECT * FROM " + tableName + ";";
  cdb.query(sql, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error en la consulta " + err });
    }

    res.json(result);
  });
};

/**
 * Obtener enlaces de los encabezados de pie pagina
 * @param req
 * @param res
 */
 const getLinksHeadersFooterByHFId = (req, res) => {
  const ID = req.params.id;
  const sql = `SELECT * FROM EnlacesPiePagina WHERE encabezadoPieId = ${ID} ORDER BY nombre`;

  cdb.query(sql, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error en la consulta " + err });
    }

    res.json(result);
  });
};

/**
 * Obtener enlace pie pagina por Id
 * @param req
 * @param res
 */
const getLinksHeadersFooterById = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM " + tableName + " WHERE enlacePiePaginaId=?";
  cdb.query(sql, [ID], (err, result, fields) => {
    if (err) {
      res.json({ message: "Error en la consulta" });
    }
    res.json(result);
  });
};

/**
 * Crear enlace pie pagina
 * @param req
 * @param res
 */
const createLinkHeadersFooter = (req, res) => {
  const values = Object.values(req.body);

  try{
      // INSERT INTO `EnlacesPiePagina` ( `encabezadoPieId`, `nombre`, `enlace`) VALUES ('1', 'catalogos', 'http://cataloggo.com')
  const sql = "INSERT INTO " + tableName + "(encabezadoPieId ,nombre, enlace) VALUES(?, ?, ?)";
  cdb.query(sql, values, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error al guardar en BD" });
    }
    res.json({ message: "Agregado con exito" });
  });

  } catch(e){
    res.json({ message: "Error al guardar en BD" });
  }

};

/**
 * Actualizar enlace pie pagina
 * @param req
 * @param res
 */
const updateLinkHeadersFooterById = (req, res) => {
  const values = Object.values(req.body);
  const ID = req.params.id;

  const sql =
    "UPDATE " + tableName + " SET nombre=?, enlace=? WHERE enlacePiePaginaId=?";
  cdb.query(sql, [...values, ID], (err, result, fields) => {
    if (err) {
      res.json({ message: "Error al actualizar" });
    }
    res.json({ message: "Actualizado con exito" });
  });
};

/**
 * eliminar enlace pie pagina
 * @param req
 * @param res
 */
const deleteLinkHeadersFooterById = (req, res) => {
  const ID = req.params.id;

  const sql = "DELETE FROM " + tableName + " WHERE enlacePiePaginaId=?";
  cdb.query(sql, ID, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error al eliminar" });
    }
    res.json({ message: "Eliminado con exito" });
  });
};

module.exports = {
  getLinksHeadersFooter,
  getLinksHeadersFooterById,
  createLinkHeadersFooter,
  updateLinkHeadersFooterById,
  deleteLinkHeadersFooterById,
  getLinksHeadersFooterByHFId
};
