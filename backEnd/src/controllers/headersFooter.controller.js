const cdb = require("../config/conexion");
const tableName = "EncabezadosPiePagina";

/**
 * Obtener encabezados pie pagina
 * @param req
 * @param res
 */
const getHeadersFooter = (req, res) => {
  const sql = "SELECT * FROM " + tableName + " ORDER BY encabezadoPieId ASC;";
  cdb.query(sql, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error en la consulta " + err });
    }

    res.json(result);
  });
};


/**
 * Obtener encabezados pie pagina por Id
 * @param req
 * @param res
 */
const getHeadersFooterById = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM " + tableName + " WHERE encabezadoPieId=?";
  cdb.query(sql, [ID], (err, result, fields) => {
    if (err) {
      res.json({ message: "Error en la consulta" });
    }
    res.json(result);
  });
};

/**
 * Crear encabezados pie pagina
 * @param req
 * @param res
 */
const createHeadersFooter = (req, res) => {
  const values = Object.values(req.body);

  const sql = "INSERT INTO " + tableName + "(Nombre, valor) VALUES(?, ?)";
  cdb.query(sql, values, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error al guardar en BD" });
    }
    res.json({ message: "Agregado con exito" });
  });
};

/**
 * Actualizar encabezados pie pagina
 * @param req
 * @param res
 */
const updateHeadersFooterById = (req, res) => {
  const values = Object.values(req.body);
  const ID = req.params.id;

  const sql =
    "UPDATE " + tableName + " SET nombre=?, valor=? WHERE encabezadoPieId=?";
  cdb.query(sql, [...values, ID], (err, result, fields) => {
    if (err) {
      res.json({ message: "Error al actualizar" });
    }
    res.json({ message: "Actualizado con exito" });
  });
};

/**
 * eliminar encabezados pie pagina
 * @param req
 * @param res
 */
const deleteHeadersFooterById = (req, res) => {
  const ID = req.params.id;

  const sql = "DELETE FROM " + tableName + " WHERE encabezadoPieId=?";
  cdb.query(sql, ID, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error al eliminar" });
    }
    res.json({ message: "Eliminado con exito" });
  });
};

module.exports = {
  getHeadersFooter,
  getHeadersFooterById,
  createHeadersFooter,
  updateHeadersFooterById,
  deleteHeadersFooterById,
};
