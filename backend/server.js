const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const rutaArchivo = path.join(__dirname, "data", "turnos.json");

// Función auxiliar para leer del archivo
function obtenerTurnosDeDisco() {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
}

// Función auxiliar para guardar en el archivo
function guardarTurnosEnDisco(turnos) {
  fs.writeFileSync(rutaArchivo, JSON.stringify(turnos, null, 2));
}

// GET: Obtener todos los turnos o filtrar por estado (Ejemplo: /api/turnos?estado=confirmado)
app.get("/api/turnos", (req, res) => {
  let turnos = obtenerTurnosDeDisco();
  const { estado } = req.query;
  
  if (estado) {
    turnos = turnos.filter(t => t.estado.toLowerCase() === estado.toLowerCase());
  }
  
  res.json(turnos);
});

// POST: Agregar un nuevo turno y guardar en disco
app.post("/api/turnos", (req, res) => {
  const turnos = obtenerTurnosDeDisco();
  const nuevo = { id: String(Date.now()), estado: "confirmado", ...req.body };
  turnos.push(nuevo);
  guardarTurnosEnDisco(turnos);
  res.status(201).json(nuevo);
});

app.listen(3000, () => console.log("API con persistencia activa en http://localhost:3000"));