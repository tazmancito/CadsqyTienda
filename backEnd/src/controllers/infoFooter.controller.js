const cdb = require("../config/conexion");
const tableName = "InfoContactoPiePagina";

/**
 * Obtener InfoFooter
 * @param req
 * @param res
 */
const getInfoFooter = (req, res) => {
  const sql = "SELECT * FROM " + tableName + ";";
  cdb.query(sql, (err, result, fields) => {
    if (err) {
      res.json({ message: "Error en la consulta " + err });
    }

    res.json(result);
  });
};

/**
 * Obtener InfoFooter por Id
 * @param req
 * @param res
 */
const getInfoFooterById = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM " + tableName + " WHERE contactoIPP_Id=?";
  cdb.query(sql, [ID], (err, result, fields) => {
    if (err) {
      res.json({ message: "Error en la consulta" });
    }
    res.json(result);
  });
};

/**
 * Actualizar InfoFooter
 * @param req
 * @param res
 */
const updateInfoFooterById = (req, res) => {
  const values = Object.values(req.body);
  const ID = req.params.id;

  const sql = "UPDATE " + tableName + " SET valor=? WHERE contactoIPP_Id=?";
  cdb.query(sql, [...values, ID], (err, result, fields) => {
    if (err) {
      res.json({ message: "Error al actualizar" });
    }
    res.json({ message: "Actualizado con exito" });
  });
};

module.exports = { updateInfoFooterById, getInfoFooterById, getInfoFooter };
