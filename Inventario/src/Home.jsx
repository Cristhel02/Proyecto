import React from "react";
import fondo from "./components/images/fondo.png";

const Home = () => (
  <main
    id="main"
    className="main"
    style={{
      backgroundImage: `url(${fondo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "90vh",
    }}
  >
    <div className="container" style={{ marginTop: "80px" }}>
      <h1>Bienvenid@</h1>
    </div>
  </main>
);

export default Home;
