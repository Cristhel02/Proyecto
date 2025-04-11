import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./Home";
import Barras from "./components/Barras/Barras";
import Categorias from "./components/inventario/categorias";
import Proveedores from "./components/inventario/proveedores";
import Inventario from "./components/vistas/inventario";
import Busqueda from "./components/vistas/busqueda";
import Dashboard from "./components/vistas/dashboard";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token); // Guardar el token en el localStorage
  };

  const handleLogout = () => {
    setToken(""); // Eliminar el token del estado
    localStorage.removeItem("token"); // Eliminar el token del localStorage
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        {/* Asegúrate de que las rutas de la barra estén dentro del Route principal */}
        <Route element={<Barras onLogout={handleLogout} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/inventario/categorias" element={<Categorias />} />
          <Route path="/inventario/proveedores" element={<Proveedores />} />
          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
