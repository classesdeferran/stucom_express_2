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
  // /api?year=2024&pais=italia
  if (req.query.year && req.query.year == "desc" && req.query.pais == "asc") {
    let json1 = jsonData.sort((a, b) => a.pais.localeCompare(b.pais, "es-ES", { numeric: true }))
    let json2 = json1.sort((a, b) => b.anyo - a.anyo)
    
    return res.json(json2);
  } else if (req.query.year && req.query.year == "desc") {
    return res.json(jsonData.sort((a, b) => b.anyo - a.anyo));
  }

  res.json(jsonData);
});

// '/api/paises' -> de cada pais el total de las ventas de cada uno
// [ {"pais": "Italia", "ventas-totales": 2500},{"pais": "Francia", "ventas-totales": 3000} ]
app.get("/api/paises", (req, res) => {
  const resultado = []
  const ventaPorPais = {}

  for (let i = 0; i < jsonData.length; i++) {
    const pais = jsonData[i].pais
    const venta = jsonData[i].venta

    if (!ventaPorPais[pais]) {
      ventaPorPais[pais] = 0
    }
    ventaPorPais[pais] += venta
  }
  console.log(ventaPorPais);
  for ( clave in ventaPorPais) {
    resultado.push({
      "pais" : clave,
      "ventas-totales" : ventaPorPais[clave]
    })
  }
  if (resultado.length == 0) return res.json({"respuesta": "No hay datos en este momento"})
  res.json(resultado)

})

// '/api/paises/italia' -> los datos solo de Italia
app.get('/api/paises/:nombrePais', (req, res) => {
  console.table(req.params);

})

app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);
