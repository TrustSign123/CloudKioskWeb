const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

connectToMongo();

const app = express();
const port = process.env.PORT;

connectToMongo()
  .then(() => {
    // Available Routes
    app.use(express.json());
    app.use(cors());
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/subscription", require("./routes/subscription"));
    app.use("/api/kioskMachine", require("./routes/kiosk"));
    app.use("/api/media", require("./routes/media"));
    app.use("/api/group", require("./routes/group"));
    app.use("/api/offlineMode", require("./routes/offlineKiosk"));

    app.listen(port, () => {
      console.log(
        `Cloud-kiosk Backend listening on port http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
