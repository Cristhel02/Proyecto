import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormularioProveedor = ({ show, onHide, onSubmit, initialData }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue("nombre", initialData.nombre);
      setValue("direccion", initialData.direccion);
      setValue("contacto_nombre", initialData.contacto_nombre);
      setValue("contacto_telefono", initialData.contacto_telefono);
      setValue("contacto_email", initialData.contacto_email);
    } else {
      reset();
    }
  }, [initialData, reset, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Editar Proveedor" : "Nuevo Proveedor"}
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

          {/* Campos de contacto */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre de Contacto</Form.Label>
            <Form.Control
              type="text"
              {...register("contacto_nombre", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono de Contacto</Form.Label>
            <Form.Control
              type="text"
              {...register("contacto_telefono", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email de Contacto</Form.Label>
            <Form.Control
              type="email"
              {...register("contacto_email", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              {...register("direccion", { required: true })}
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

export default FormularioProveedor;
