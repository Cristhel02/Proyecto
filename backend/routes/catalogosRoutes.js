const express = require("express");
const router = express.Router();
const catalogosController = require("../controllers/catalogosController");

// Rutas para categorías
router.get("/categorias", catalogosController.getCategorias);
router.post("/categorias", catalogosController.createCategoria);
router.put("/categorias/:id", catalogosController.updateCategoria);
router.delete("/categorias/:id", catalogosController.deleteCategoria);

// Rutas para proveedores
router.get("/proveedores", catalogosController.getProveedores);
router.post("/proveedores", catalogosController.createProveedor);
router.put("/proveedores/:id", catalogosController.updateProveedor);
router.delete("/proveedores/:id", catalogosController.deleteProveedor);

module.exports = router;
