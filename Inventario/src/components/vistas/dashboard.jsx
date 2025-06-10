import React from "react";
import Chart from "react-apexcharts";
import { useObtenerMaquinasDetalleQuery } from "../../services/inventario.service";

const Dashboard = () => {
  const { data: maquinas = [], isLoading } = useObtenerMaquinasDetalleQuery();

  if (isLoading) return <p className="text-white">Cargando gráficos...</p>;

  const maquinasPorCategoria = {};
  maquinas.forEach((m) => {
    const nombre = m.categoria || "Sin categoría";
    maquinasPorCategoria[nombre] = (maquinasPorCategoria[nombre] || 0) + 1;
  });

  const categorias = Object.keys(maquinasPorCategoria);
  const generarColores = (cantidad) => {
    return Array.from(
      { length: cantidad },
      (_, i) => `hsl(${(i * 360) / cantidad}, 70%, 50%)`
    );
  };
  const coloresDinamicos = generarColores(categorias.length);

  const categoriaChart = {
    options: {
      chart: {
        id: "bar-categorias",
        toolbar: { show: false },
        background: "#000",
      },
      theme: { mode: "dark" },
      xaxis: {
        categories: categorias,
        labels: { style: { colors: "#fff" } },
      },
      yaxis: {
        labels: { style: { colors: "#fff" } },
      },
      title: {
        text: "Máquinas por Categoría",
        align: "center",
        style: { fontSize: "16px", color: "#fff" },
      },
      colors: coloresDinamicos,
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      grid: {
        borderColor: "#333",
      },
    },
    series: [{ name: "Cantidad", data: Object.values(maquinasPorCategoria) }],
  };

  const maquinasPorEstatus = maquinas.reduce(
    (acc, m) => {
      const estatus = m.estatus?.toLowerCase();
      if (estatus === "activo") acc["Activo"] += 1;
      else if (estatus === "inactivo") acc["Inactivo"] += 1;
      return acc;
    },
    { Activo: 0, Inactivo: 0 }
  );

  const estadoChart = {
    options: {
      chart: {
        background: "#000",
      },
      theme: { mode: "dark" },
      labels: ["Activo", "Inactivo"],
      colors: ["#FF69B4", "#FF4500"],
      title: {
        text: "Distribución por Estatus",
        align: "center",
        style: { fontSize: "16px", color: "#fff" },
      },
      legend: {
        position: "bottom",
        labels: { colors: "#fff" },
      },
      tooltip: {
        style: { fontSize: "14px" },
      },
    },
    series: [maquinasPorEstatus.Activo, maquinasPorEstatus.Inactivo],
  };

  const adquisicionesPorMes = {};
  maquinas.forEach((m) => {
    if (!m.fecha_adquisicion) return;
    const fecha = new Date(m.fecha_adquisicion);
    const mes = fecha.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    adquisicionesPorMes[mes] = (adquisicionesPorMes[mes] || 0) + 1;
  });

  const mesesOrdenados = Object.keys(adquisicionesPorMes).sort(
    (a, b) => new Date("1 " + a) - new Date("1 " + b)
  );

  const adquisicionesChart = {
    options: {
      chart: {
        id: "line-adquisiciones",
        toolbar: { show: false },
        background: "#000",
      },
      theme: { mode: "dark" },
      xaxis: {
        categories: mesesOrdenados,
        labels: { style: { colors: "#fff" } },
      },
      yaxis: {
        labels: { style: { colors: "#fff" } },
      },
      title: {
        text: "Adquisiciones por Mes",
        align: "center",
        style: { fontSize: "16px", color: "#fff" },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      colors: ["#00FFFF"],
      grid: {
        borderColor: "#333",
      },
      markers: {
        size: 5,
        colors: ["#00FFFF"],
        strokeColors: "#fff",
        strokeWidth: 2,
      },
    },
    series: [
      {
        name: "Adquisiciones",
        data: mesesOrdenados.map((m) => adquisicionesPorMes[m]),
      },
    ],
  };

  return (
    <div
      style={{ backgroundColor: "#000", minHeight: "100vh", padding: "45px" }}
    >
      {/* Gráfico 1 */}
      <div
        style={{
          backgroundColor: "#000",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          marginBottom: "24px",
          height: "320px",
        }}
      >
        <Chart
          options={categoriaChart.options}
          series={categoriaChart.series}
          type="bar"
          height={300}
        />
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Gráfico 2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
            height: "320px",
          }}
        >
          <Chart
            options={estadoChart.options}
            series={estadoChart.series}
            type="donut"
            height={300}
          />
        </div>

        {/* Gráfico 3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
            height: "320px",
          }}
        >
          <Chart
            options={adquisicionesChart.options}
            series={adquisicionesChart.series}
            type="line"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
