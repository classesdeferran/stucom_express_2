const path = require("node:path");
const express = require("express");

const app = express();

process.loadEnvFile();
const PORT = process.env.PORT || 8888;

const jsonData = require("./ventas.json");
// console.log(jsonData);

app.get("/", (req, res) => res.send("Hello World!"));

// /api
app.get("/api", (req, res) => {

    // query
//   console.table(req.query);

  if (req.query.year && req.query.year == "desc" && req.query.pais == "asc") {
    let json1 = jsonData.sort((a, b) => a.pais.localeCompare(b.pais, "es-ES", { numeric: true }))
    let json2 = json1.sort((a, b) => b.anyo - a.anyo)
    
    return res.json(json2);
  } else if (req.query.year && req.query.year == "desc") {
    return res.json(jsonData.sort((a, b) => b.anyo - a.anyo));
  }

  res.json(jsonData);
});

app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);
