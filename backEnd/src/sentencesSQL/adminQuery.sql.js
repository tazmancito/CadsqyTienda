const cdb = require("../config/conexion");

const saveBackground = async (data) => {
  try {
    const values = Object.values(data);
    const sentence = `INSERT INTO ArchivosExtra (ArchivosExtraId, urlArchivo) VALUES (?,?)`;
    let result = await cdb.query(sentence, values);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setBackgroundById = async (data) => {
  try {
    const sentence = `UPDATE ArchivosExtra SET urlArchivo = '${data.urlArchivo}' WHERE ArchivosExtra.ArchivosExtraId = '${data.ArchivosExtraId}'`;
    let result = await cdb.query(sentence);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getBackgroundById = async (id) => {
  try {
    const sentence = `SELECT * FROM ArchivosExtra WHERE ArchivosExtra.ArchivosExtraId = '${id}'`;
    let result = await cdb.query(sentence);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAmountBlogsReview = async () => {
  try {
    const sentence = "SELECT COUNT(*) FROM AdminBlogsReview;";
    let result = await cdb.query(sentence);
    return (result = await cdb.query(sentence));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getBlogsReview = async () => {
  try {
    const sentence = "SELECT * FROM AdminBlogsReview;";
    let result = await cdb.query(sentence);
    return (result = await cdb.query(sentence));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getBlogsRefused = async () => {
  try {
    const sentence = "SELECT * FROM AdminBlogsRefused;";
    let result = await cdb.query(sentence);
    return (result = await cdb.query(sentence));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getBlogsAccepted = async () => {
  try {
    const sentence = "SELECT * FROM AdminBlogsAccepted;";
    let result = await cdb.query(sentence);
    return (result = await cdb.query(sentence));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getBlogReview = async (id) => {
  try {
    const sentence =
      "SELECT Blog.BlogId, Blog.Fecha, Blog.estado, CategoriasBlog.Nombre as Categoria, Blog.titulo, Usuarios.Nombre, Usuarios.Apellido, Blog.Descripcion, Blog.URLImagenPrincipal From `Blog` LEFT JOIN `CategoriasBlog` ON( Blog.CategoriaBlogId = CategoriasBlog.CategoriaBlogId) LEFT JOIN `Usuarios` on ( Usuarios.UsuarioId = Blog.UsuarioId) WHERE Blog.BlogId = " +
      id +
      ";";
    let result = await cdb.query(sentence);
    return (result = await cdb.query(sentence));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getFullNameUser = async (usuarioId) => {
  try {
    const sentence =
      "SELECT Nombre, Apellido FROM Usuarios where UsuarioId=" + usuarioId;
    let result = await cdb.query(sentence);
    return (result = await cdb.query(sentence));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setStateBlog = async (state, date, id) => {
  try {
    const sentence =
      "UPDATE Blog SET estado = " +
      state +
      " ,FechaEstado = '" +
      date +
      "' WHERE `Blog`.`BlogId` = " +
      id +
      ";";
    let result = await cdb.query(sentence);
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getBlogReview,
  getBlogsReview,
  setStateBlog,
  getFullNameUser,
  getAmountBlogsReview,
  getBlogsRefused,
  getBlogsAccepted,
  saveBackground,
  setBackgroundById,
  getBackgroundById,
};
