const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})

const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// <--- Habilitamos CORS
app.use(cors());

app.listen(3000, () => {
    console.log("Servidor levantado en puerto 3000");
});

app.get("/posts", async (req, res) => {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
})

app.post("/posts", async (req, res) => {
    const post = req.body;
    const values = Object.values(post);
    await pool.query("INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)", values);
    res.send("El registro ha sido insertado con éxito")
})