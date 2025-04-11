const db = require("../db");

// Obtener todas las categorías
exports.getCategorias = (req, res) => {
  db.query("SELECT * FROM categorias", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Crear una categoría
exports.createCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;

  db.query(
    "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Categoría creada con éxito" });
    }
  );
};

// Actualizar una categoría
exports.updateCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
    [nombre, descripcion, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Categoría actualizada con éxito" });
    }
  );
};

// Eliminar una categoría
exports.deleteCategoria = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM categorias WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Categoría eliminada con éxito" });
  });
};

// Obtener todos los proveedores
exports.getProveedores = (req, res) => {
  db.query("SELECT * FROM proveedores", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Crear un proveedor
exports.createProveedor = (req, res) => {
  const {
    nombre,
    contacto_nombre,
    contacto_telefono,
    contacto_email,
    direccion,
  } = req.body;

  db.query(
    "INSERT INTO proveedores (nombre, contacto_nombre, contacto_telefono, contacto_email, direccion) VALUES (?, ?, ?, ?, ?)",
    [nombre, contacto_nombre, contacto_telefono, contacto_email, direccion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Proveedor creado con éxito" });
    }
  );
};

// Actualizar un proveedor
exports.updateProveedor = (req, res) => {
  const {
    nombre,
    contacto_nombre,
    contacto_telefono,
    contacto_email,
    direccion,
  } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE proveedores SET nombre = ?, contacto_nombre = ?, contacto_telefono = ?, contacto_email = ?, direccion = ? WHERE id = ?",
    [nombre, contacto_nombre, contacto_telefono, contacto_email, direccion, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Proveedor actualizado con éxito" });
    }
  );
};

// Eliminar un proveedor
exports.deleteProveedor = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM proveedores WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Proveedor eliminado con éxito" });
  });
};
