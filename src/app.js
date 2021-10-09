const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname__, "./public")))

app.listen(port, () => console.log("Servidor corriendo"))
