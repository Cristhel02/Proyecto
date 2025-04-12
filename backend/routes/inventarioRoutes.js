const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventarioController");

// Rutas para máquinas
router.get("/maquinas", inventarioController.getMaquinas);
router.post("/maquinas", inventarioController.createMaquina);
router.put("/maquinas/:id", inventarioController.updateMaquina);
router.delete("/maquinas/:id", inventarioController.deleteMaquina);

module.exports = router;
