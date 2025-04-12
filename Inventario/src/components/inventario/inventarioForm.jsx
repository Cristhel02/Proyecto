import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import {
  useCrearMaquinaMutation,
  useActualizarMaquinaMutation,
} from "../../services/inventario.service";
import {
  useObtenerCategoriasQuery,
  useObtenerProveedoresQuery,
} from "../../services/catalogos.service";
import "bootstrap-icons/font/bootstrap-icons.css";

const InventarioForm = ({ onSuccess, defaultValues }) => {
  const { register, handleSubmit, reset } = useForm();
  const [crearMaquina] = useCrearMaquinaMutation();
  const [actualizarMaquina] = useActualizarMaquinaMutation();
  const { data: categorias = [] } = useObtenerCategoriasQuery();
  const { data: proveedores = [] } = useObtenerProveedoresQuery();

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        estatus: defaultValues.estatus === 1,
        fecha_adquisicion: defaultValues.fecha_adquisicion?.split("T")[0], // quitar hora
      });
    } else {
      reset({
        estatus: true,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        categoria_id: parseInt(data.categoria_id),
        proveedor_id: parseInt(data.proveedor_id),
        estatus: data.estatus ? 1 : 0,
      };

      if (defaultValues?.id) {
        await actualizarMaquina({ id: defaultValues.id, ...payload }).unwrap();
        alert("Máquina actualizada con éxito");
      } else {
        await crearMaquina(payload).unwrap();
        alert("Máquina creada con éxito");
      }

      reset();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" {...register("nombre")} required />
      </Form.Group>

      <Form.Group controlId="descripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" {...register("descripcion")} required />
      </Form.Group>

      <Form.Group controlId="marca">
        <Form.Label>Marca</Form.Label>
        <Form.Control type="text" {...register("marca")} required />
      </Form.Group>

      <Form.Group controlId="modelo">
        <Form.Label>Modelo</Form.Label>
        <Form.Control type="text" {...register("modelo")} required />
      </Form.Group>

      <Form.Group controlId="fecha_adquisicion">
        <Form.Label>Fecha de Adquisición</Form.Label>
        <Form.Control type="date" {...register("fecha_adquisicion")} required />
      </Form.Group>

      <Form.Group controlId="ubicacion">
        <Form.Label>Ubicación</Form.Label>
        <Form.Control type="text" {...register("ubicacion")} required />
      </Form.Group>

      <Form.Group controlId="categoria_id">
        <Form.Label>Categoría</Form.Label>
        <Form.Select {...register("categoria_id")} required>
          <option value="">Seleccione</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="proveedor_id">
        <Form.Label>Proveedor</Form.Label>
        <Form.Select {...register("proveedor_id")} required>
          <option value="">Seleccione</option>
          {proveedores.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="estatus" className="mb-3">
        <Form.Check type="switch" label="Activo" {...register("estatus")} />
      </Form.Group>

      <Button type="submit" variant="success">
        <i className="bi bi-floppy "></i> Guardar
      </Button>
    </Form>
  );
};

export default InventarioForm;
