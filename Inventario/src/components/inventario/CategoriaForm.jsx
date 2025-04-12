import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormularioCategoria = ({ show, onHide, onSubmit, initialData }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue("nombre", initialData.nombre);
      setValue("descripcion", initialData.descripcion);
    } else {
      reset();
    }
  }, [initialData, reset, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Editar Categoría" : "Nueva Categoría"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              {...register("nombre", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("descripcion", { required: true })}
            />
          </Form.Group>

          <Button type="submit" variant="success">
            <i className="bi bi-floppy "></i> Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioCategoria;
