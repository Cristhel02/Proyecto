import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const BarraLateral = ({ show, onClose }) => {
  return (
    <Offcanvas show={show} onHide={onClose} placement="start">
      <Offcanvas.Header closeButton style={{ backgroundColor: "#ffc107" }}>
        <Offcanvas.Title>Menú de Opciones</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#565552" }}>
      <Nav defaultActiveKey="/" className="flex-column">
          <Nav.Link href="/inventario" style={{ color: "white" }}><i className="bi bi-clipboard-data"/> Inventario</Nav.Link>
          <Nav.Link href="/busqueda" style={{ color: "white" }}><i className="bi bi-search"/> Búsqueda</Nav.Link>
          <Nav.Link href="/dashboard" style={{ color: "white" }}><i className="bi bi-bar-chart-fill"/> Dashboard</Nav.Link>
        </Nav>
      </Offcanvas.Body> 
    </Offcanvas>

  );
};

export default BarraLateral;
