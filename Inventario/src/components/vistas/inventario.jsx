import React, { useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import InventarioForm from "../inventario/inventarioForm";
import {
  useObtenerMaquinasQuery,
  useEliminarMaquinaMutation,
} from "../../services/inventario.service";
import {
  useObtenerCategoriasQuery,
  useObtenerProveedoresQuery,
} from "../../services/catalogos.service";

const Inventario = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { data: maquinas = [], isLoading, refetch } = useObtenerMaquinasQuery();
  const { data: categorias = [] } = useObtenerCategoriasQuery();
  const { data: proveedores = [] } = useObtenerProveedoresQuery();
  const [eliminarMaquina] = useEliminarMaquinaMutation();

  const getCategoriaNombre = (id) => {
    const cat = categorias.find((c) => c.id === id);
    return cat?.nombre || "-";
  };

  const getProveedorNombre = (id) => {
    const prov = proveedores.find((p) => p.id === id);
    return prov?.nombre || "-";
  };

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (maquina) => {
    setEditData(maquina);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta máquina?")) {
      try {
        await eliminarMaquina(id).unwrap();
        alert("Máquina eliminada correctamente");
        refetch();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar");
      }
    }
  };

  return (
    <Container>
      <div className="container" style={{ marginTop: "80px" }}>
        <h2>Inventario de Máquinas</h2>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editData ? "Editar Máquina" : "Nueva Máquina"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InventarioForm
            onSuccess={() => {
              handleClose();
              refetch();
            }}
            defaultValues={editData}
          />
        </Modal.Body>
      </Modal>

      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-plus-lg"></i> Agregar
      </Button>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Fecha Adquisición</th>
              <th>Ubicación</th>
              <th>Categoría</th>
              <th>Proveedor</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {maquinas.map((maq, index) => (
              <tr key={maq.id}>
                <td>{index + 1}</td>
                <td>{maq.nombre}</td>
                <td>{maq.descripcion}</td>
                <td>{maq.marca}</td>
                <td>{maq.modelo}</td>
                <td>{new Date(maq.fecha_adquisicion).toLocaleDateString()}</td>
                <td>{maq.ubicacion}</td>
                <td>{getCategoriaNombre(maq.categoria_id)}</td>
                <td>{getProveedorNombre(maq.proveedor_id)}</td>
                <td>{maq.estatus === 1 ? "Activo" : "Inactivo"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(maq)}
                  >
                    <i className="bi bi-pencil-square "></i>
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(maq.id)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Inventario;
