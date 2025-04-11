const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");
const catalogosRoutes = require("./routes/catalogosRoutes");
const inventarioRoutes = require("./routes/inventarioRoutes");

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()); // Para manejar JSON en las peticiones

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", homeRoutes);
app.use("/api", catalogosRoutes);
app.use("/api", inventarioRoutes);

// Iniciar servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
