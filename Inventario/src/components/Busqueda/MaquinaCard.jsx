import React from "react";
import { Card } from "react-bootstrap";

const MaquinaCard = ({ maquina }) => {
  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="text-white bg-dark mt-3">
      <Card.Header className="text-center bg-warning text-dark">
        {maquina.maquina_nombre}
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column">
          <div className="mb-2">
            <strong>Marca:</strong> {maquina.marca}
          </div>
          <div className="mb-2">
            <strong>Modelo:</strong> {maquina.modelo}
          </div>
          <div className="mb-2">
            <strong>Fecha de Adquisición:</strong>{" "}
            {formatFecha(maquina.fecha_adquisicion)}
          </div>
          <div className="mb-2">
            <strong>Ubicación:</strong> {maquina.ubicacion}
          </div>
          <div className="mb-2">
            <strong>Categoría:</strong> {maquina.categoria}
          </div>
          <div className="mb-2">
            <strong>Proveedor:</strong> {maquina.proveedor}
          </div>
          <div className="mb-2">
            <strong>Nombre del Contacto:</strong> {maquina.contacto_nombre}
          </div>
          <div className="mb-2">
            <strong>Teléfono:</strong> {maquina.contacto_telefono}
          </div>
          <div className="mb-2">
            <strong>Estatus:</strong> {maquina.estatus}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MaquinaCard;
