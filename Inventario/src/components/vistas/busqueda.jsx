import { useState, useEffect } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import MaquinaCard from "../Busqueda/MaquinaCard";
import { useObtenerMaquinasDetalleQuery } from "../../services/inventario.service";
import { useBuscarMaquinasPorNombreQuery } from "../../services/inventario.service";
import "bootstrap-icons/font/bootstrap-icons.css";

const Busqueda = () => {
  const [query, setQuery] = useState("");
  const [maquinas, setMaquinas] = useState([]);

  const {
    data: maquinasDetalle,
    isLoading: isLoadingMaquinasDetalle,
    isError: isErrorMaquinasDetalle,
  } = useObtenerMaquinasDetalleQuery();

  const {
    data: maquinasFiltradas,
    isLoading: isLoadingBusqueda,
    isError: isErrorBusqueda,
  } = useBuscarMaquinasPorNombreQuery(query, {
    skip: !query,
  });

  useEffect(() => {
    if (maquinasDetalle) {
      setMaquinas(maquinasDetalle);
    }
  }, [maquinasDetalle]);

  const handleSearch = () => {
    if (!query) {
      setMaquinas(maquinasDetalle);
    }
  };

  const handleClear = () => {
    setQuery("");
    setMaquinas(maquinasDetalle);
  };

  return (
    <Container style={{ marginTop: "80px" }}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar por Nombre de la Maquina..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="warning" onClick={handleSearch}>
          <i className="bi bi-search"></i>
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          <i className="bi bi-x"></i>
        </Button>
      </InputGroup>

      {isLoadingMaquinasDetalle || isLoadingBusqueda ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : isErrorMaquinasDetalle || isErrorBusqueda ? (
        <Alert variant="danger">Error al obtener las máquinas</Alert>
      ) : (
        <Row>
          {(query ? maquinasFiltradas : maquinas)?.length > 0 ? (
            (query ? maquinasFiltradas : maquinas).map((maquina) => (
              <Col key={maquina.id} md={6} lg={4}>
                <MaquinaCard maquina={maquina} />
              </Col>
            ))
          ) : query ? (
            <Col>
              <Alert variant="info">No se encontraron resultados</Alert>
            </Col>
          ) : (
            <Col>
              <Alert variant="info">No hay máquinas disponibles</Alert>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Busqueda;
