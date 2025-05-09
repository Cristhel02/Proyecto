const db = require("../db");

// Obtener todas las máquinas desde la vista
exports.getMaquinas = (req, res) => {
  db.query("SELECT * FROM maquinas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Crear una máquina
exports.createMaquina = (req, res) => {
  const {
    nombre,
    descripcion,
    marca,
    modelo,
    fecha_adquisicion,
    ubicacion,
    estatus,
    categoria_id,
    proveedor_id,
  } = req.body;

  db.query(
    `INSERT INTO maquinas (
      nombre, descripcion, marca, modelo, fecha_adquisicion,
      ubicacion, estatus, categoria_id, proveedor_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      descripcion,
      marca,
      modelo,
      fecha_adquisicion,
      ubicacion,
      estatus,
      categoria_id,
      proveedor_id,
    ],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Máquina creada con éxito" });
    }
  );
};

// Actualizar una máquina
exports.updateMaquina = (req, res) => {
  const {
    nombre,
    descripcion,
    marca,
    modelo,
    fecha_adquisicion,
    ubicacion,
    estatus,
    categoria_id,
    proveedor_id,
  } = req.body;

  const { id } = req.params;

  db.query(
    `UPDATE maquinas SET
      nombre = ?, descripcion = ?, marca = ?, modelo = ?,
      fecha_adquisicion = ?, ubicacion = ?, estatus = ?,
      categoria_id = ?, proveedor_id = ?
    WHERE id = ?`,
    [
      nombre,
      descripcion,
      marca,
      modelo,
      fecha_adquisicion,
      ubicacion,
      estatus,
      categoria_id,
      proveedor_id,
      id,
    ],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Máquina actualizada con éxito" });
    }
  );
};

// Eliminar una máquina
exports.deleteMaquina = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM maquinas WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Máquina eliminada con éxito" });
  });
};

// Obtener detalle de máquinas desde la vista vw_maquinas_detalle
exports.getMaquinasDetalle = (req, res) => {
  db.query("SELECT * FROM vw_maquinas_detalle", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Buscar máquinas por nombre desde vw_maquinas_detalle
exports.buscarMaquinasPorNombre = (req, res) => {
  const { maquina_nombre } = req.query;
  const query = `
    SELECT * FROM vw_maquinas_detalle 
    WHERE maquina_nombre LIKE ?`;

  db.query(query, [`%${maquina_nombre}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
