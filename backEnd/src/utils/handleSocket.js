const socketConectionManagement = async (socket) => {
  let token = socket.handshake.auth.token;

  if (socket.handshake) {
    console.log("a user connected ");
    socket.emit("server", { taz: "hola soy el server" });
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  //socket.on("client", emit);
};

const emit = async (data) => {
  console.log(data);
};

module.exports = { socketConectionManagement };


