const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./database/mongo-db");
const path = require("path");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    //!Conectar a base de datos
    this.connectionDB();

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
    this.app.use("/api", [
      require("./routes/auth.routes"),
      require("./routes/users.routes"),
      require("./routes/roles.routes"),
      require("./routes/movies.routes"),
    ]);
    // this.app.use(this.pathRoles, require("./routes/roles.routes"));
    // this.app.use(this.pathMovies, require("./routes/movies.routes"));
  }

  async connectionDB() {
    await dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app run port ${this.port}`);
    });
  }
}

module.exports = Server;
