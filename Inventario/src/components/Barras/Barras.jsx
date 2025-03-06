import React, { useState } from "react";
import BarraSuperior from "./BarraSuperior";
import BarraLateral from "./BarraLateral";
import Home from "../../Home";

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

      <Home onLogout={onLogout} />
    </div>
  );
};

export default Barras;
