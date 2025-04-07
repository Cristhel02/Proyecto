import React, { useState } from "react";
import BarraSuperior from "./BarraSuperior";
import BarraLateral from "./BarraLateral";
import { Outlet } from "react-router-dom";

const Barras = ({ onLogout }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div>
      {/* Pasa correctamente la función a la barra superior */}
      <BarraSuperior
        onLogout={onLogout}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* Barra lateral */}
      <BarraLateral show={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Aquí se renderiza el contenido de las rutas hijas */}
      <Outlet />
    </div>
  );
};

export default Barras;
