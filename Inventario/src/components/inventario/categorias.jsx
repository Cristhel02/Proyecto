import React, { useState } from "react";
import {
  useObtenerCategoriasQuery,
  useCrearCategoriaMutation,
  useActualizarCategoriaMutation,
  useEliminarCategoriaMutation,
} from "../../services/catalogos.service";
import { Table, Button } from "react-bootstrap";
import FormularioCategoria from "./CategoriaForm";

const Categorias = () => {
  const { data: categorias = [], refetch } = useObtenerCategoriasQuery();
  const [crearCategoria] = useCrearCategoriaMutation();
  const [actualizarCategoria] = useActualizarCategoriaMutation();
  const [eliminarCategoria] = useEliminarCategoriaMutation();

  const [showModal, setShowModal] = useState(false);
  const [categoriaActual, setCategoriaActual] = useState(null);

  const handleOpenModal = (categoria = null) => {
    setCategoriaActual(categoria);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoriaActual(null);
  };

  const handleSubmit = async (data) => {
    if (categoriaActual) {
      await actualizarCategoria({ id: categoriaActual.id, ...data });
    } else {
      await crearCategoria(data);
    }
    refetch();
    handleCloseModal();
  };

  const handleEliminar = async (id) => {
    await eliminarCategoria(id);
    refetch();
  };

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h1>Catálogo de Categorías</h1>
      <Button className="my-3" onClick={() => handleOpenModal()}>
        <i className="bi bi-plus-lg"></i> Agregar
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, idx) => (
            <tr key={categoria.id}>
              <td>{idx + 1}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleOpenModal(categoria)}
                >
                  <i className="bi bi-pencil-square "></i>
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(categoria.id)}
                >
                  <i className="bi bi-trash3-fill"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <FormularioCategoria
        show={showModal}
        onHide={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={categoriaActual}
      />
    </div>
  );
};

export default Categorias;
