const express = require("express");
const cors = require("cors");

const motosRoutes = require("./routes/motos.routes");

const app = express();
app.use("/assets", express.static("public/assets"));

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/motos", motosRoutes);

module.exports = app;