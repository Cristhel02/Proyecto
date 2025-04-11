import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const BarraLateral = ({ show, onClose }) => {
  const [inventarioOpen, setInventarioOpen] = useState(false);

  return (
    <Offcanvas show={show} onHide={onClose} placement="start">
      <Offcanvas.Header closeButton style={{ backgroundColor: "#ffc107" }}>
        <Offcanvas.Title>Menú de Opciones</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#565552" }}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/home" style={{ color: "white" }}>
            <i className="bi bi-house-door" /> Inicio
          </Nav.Link>

          {/* Enlace seleccionable para Inventario */}
          <Nav.Link
            as={Link}
            to="/inventario" // Ruta seleccionable para Inventario
            style={{ color: "white" }}
            onClick={() => setInventarioOpen(!inventarioOpen)} // Toggle para abrir/cerrar submenú
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <i className="bi bi-clipboard-data" /> Inventario
              </span>
              <i
                className={`bi ${
                  inventarioOpen ? "bi bi-chevron-down" : "bi bi-chevron-right"
                }`}
              />
            </div>
          </Nav.Link>

          {/* Submenú de Categorías y Proveedores */}
          {inventarioOpen && (
            <>
              <Nav.Link
                as={Link}
                to="/inventario/categorias"
                style={{ color: "white", paddingLeft: "2rem" }}
              >
                <i className="bi bi-tags" /> Categorías
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/inventario/proveedores"
                style={{ color: "white", paddingLeft: "2rem" }}
              >
                <i className="bi bi-truck" /> Proveedores
              </Nav.Link>
            </>
          )}

          <Nav.Link as={Link} to="/busqueda" style={{ color: "white" }}>
            <i className="bi bi-search" /> Búsqueda
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard" style={{ color: "white" }}>
            <i className="bi bi-bar-chart-fill" /> Dashboard
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BarraLateral;
