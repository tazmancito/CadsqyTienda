const cdb = require("../config/conexion");
const tableName = "Roles";

/** 
 * Obtener Rols
 * @param req
 * @param res
*/
 const getRols = (req, res) => {
  
  const sql = "SELECT * FROM " + tableName +";";
  cdb.query(sql, (err, result, fields) => {
    if(err) {
      res.json({ message: "Error en la consulta " + err });
    }

    res.json(result)
  })
}

/** 
 * Obtener Rols por Id
 * @param req
 * @param res
*/
const getRolById = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM " + tableName +" WHERE RolId=?";
  cdb.query(sql,[ID], (err, result, fields) => {
    if(err) {
      res.json({ message: "Error en la consulta" });
    }
    res.json(result)
  })
}

/** 
 * Crear Roles
 * @param req
 * @param res
*/
const createRol = (req, res) => {
  const values = Object.values(req.body)

  const sql = "INSERT INTO " + tableName +"(Nombre, Descripcion) VALUES(?, ?)";
  cdb.query(sql, values, (err, result, fields) => {
    if(err) {
      res.json({ message: "Error al guardar en BD" });
    }
    res.json({message: "Agregado con exito"})
  })
}

/** 
 * Actualizar Roles
 * @param req
 * @param res
*/
const updateRolById = (req, res) => {
  const values = Object.values(req.body);
  const ID = req.params.id;

  const sql = "UPDATE " + tableName +" SET Nombre=?, Descripcion=? WHERE RolId=?";
  cdb.query(sql, [...values, ID], (err, result, fields) => {
    if(err) {
      res.json({ message: "Error al actualizar" });
    }
    res.json({message: "Actualizado con exito"})
  })
}

/** 
 * eliminar Roles
 * @param req
 * @param res
*/
const deleteRolById = (req, res) => {
  const ID = req.params.id;

  const sql = "DELETE FROM " + tableName +" WHERE RolId=?";
  cdb.query(sql, ID, (err, result, fields) => {
    if(err) {
      res.json({ message: "Error al eliminar" });
    }
    res.json({message: "Eliminado con exito"})
  })
}

module.exports = { getRols, getRolById, createRol, updateRolById, deleteRolById };