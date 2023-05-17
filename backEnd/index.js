"use strict";
require("dotenv").config();
const express = require("express"),
  cookieParser = require("cookie-parser");

const cors = require("cors");

const morganBody = require("morgan-body");

const { loggerStream } = require("./src/utils/handleLoger");

const PORT = process.env.PORT || 3003;

// SERVIDOR
const app = express();

// exponer carpeta
app.use(express.static("./Public"));

// habilitar body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Habiliar los cors
app.use(cors());

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["https://localhost", "https://api.cadsqy.com"],
  },
  path: "/api/socket",
});

const { socketConectionManagement } = require("./src/utils/handleSocket");

io.on("connection", socketConectionManagement);

// PARA HABILITAR EL ENVIO DE ERRORES ---> return res.statusCode < 400; // TODO 2xx, 3xx
morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 600; // TODO 2xx, 3xx
  },
});

//midlewares

// rutas

const mainRoutes = require("./src/routes/main.routes");

const adminRoutes = require("./src/routes/admin.routes");

const rolsRoutes = require("./src/routes/rols.routes");
const userRoutes = require("./src/routes/users.routes");
const authRoutes = require("./src/routes/auth.routes");

const categoriesRoutes = require("./src/routes/categories.routes");
const productRoutes = require("./src/routes/products.routes");

const cartRoutes = require("./src/routes/cart.routes");

const infoFooter = require("./src/routes/infoFooter.routes");
const headersFooter = require("./src/routes/headerFooters.routes");
const linksHeaderFooter = require("./src/routes/linksheaderFooters.routes");

//nombre de la api
const apiname = "tienda";

app.use(function (req, res, next) {
  req.io = io;
  next();
});

// endpoints
app.use(`/${apiname}`, mainRoutes());
// ruta para login y registro
app.use(`/${apiname}/auth`, authRoutes());
app.use(`/${apiname}/administrar`, adminRoutes());
app.use(`/${apiname}/usuarios`, userRoutes());
app.use(`/${apiname}/roles`, rolsRoutes());

app.use(`/${apiname}/productos`, productRoutes());
app.use(`/${apiname}/categorias`, categoriesRoutes());

app.use(`/${apiname}/carts`, cartRoutes());

app.use(`/${apiname}/infofooter`, infoFooter());
app.use(`/${apiname}/encabezadospiepagina`, headersFooter());
app.use(`/${apiname}/linksencabezadospiepagina`, linksHeaderFooter());

/// para descargar archivo
app.use(`/${apiname}/images/:id`, function (req, res) {
  res.download("Storage/1.png");
});

http.listen(PORT, () => {
  console.log("Running server on port:" + PORT);
});
