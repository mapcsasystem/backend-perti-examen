require("dotenv").config();
const Server = require("./server");

const server = new Server();
server.listen();
console.log(process.env.NODE_ENV);
