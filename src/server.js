const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongoDB");
const path = require("path");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.pathUsers = "/api/users";
    //! Middelewares
    this.middlewares();

    //! My app Rouuts
    this.routes();
  }

  middlewares() {
    //! CORS
    this.app.use(cors());

    //! Parse JSON
    this.app.use(express.json());

    //! public folder
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  routes() {
    //! Routes Users
    this.app.use(this.pathUsers, require("./routes/users.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app run port ${this.port}`);
      dbConnect();
    });
  }
}

module.exports = Server;
