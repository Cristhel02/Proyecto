import React, { useState } from "react";
import {
  useObtenerProveedoresQuery,
  useCrearProveedorMutation,
  useActualizarProveedorMutation,
  useEliminarProveedorMutation,
} from "../../services/catalogos.service";
import { Table, Button } from "react-bootstrap";
import FormularioProveedor from "./proveedoresForm";

const Proveedores = () => {
  const { data: proveedores = [], refetch } = useObtenerProveedoresQuery();
  const [crearProveedor] = useCrearProveedorMutation();
  const [actualizarProveedor] = useActualizarProveedorMutation();
  const [eliminarProveedor] = useEliminarProveedorMutation();

  const [showModal, setShowModal] = useState(false);
  const [proveedorActual, setProveedorActual] = useState(null);

  const handleOpenModal = (proveedor = null) => {
    setProveedorActual(proveedor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProveedorActual(null);
  };

  const handleSubmit = async (data) => {
    if (proveedorActual) {
      await actualizarProveedor({ id: proveedorActual.id, ...data });
    } else {
      await crearProveedor(data);
    }
    refetch();
    handleCloseModal();
  };

  const handleEliminar = async (id) => {
    await eliminarProveedor(id);
    refetch();
  };

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h1>Catálogo de Proveedores</h1>
      <Button className="my-3" onClick={() => handleOpenModal()}>
        <i className="bi bi-plus-lg"></i> Agregar
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Nombre del contacto</th>
            <th>Número de teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor, idx) => (
            <tr key={proveedor.id}>
              <td>{idx + 1}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.contacto_nombre}</td>
              <td>{proveedor.contacto_telefono}</td>
              <td>{proveedor.contacto_email}</td>
              <td>{proveedor.direccion}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleOpenModal(proveedor)}
                >
                  <i className="bi bi-pencil-square "></i>
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(proveedor.id)}
                >
                  <i className="bi bi-trash3-fill"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <FormularioProveedor
        show={showModal}
        onHide={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={proveedorActual}
      />
    </div>
  );
};

export default Proveedores;
