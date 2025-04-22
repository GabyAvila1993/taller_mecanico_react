<!-- Modelo a tener en cuenta si no funciona App.jsx -->

import React, { useState, useEffect } from 'react';

function App() {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [reparaciones, setReparaciones] = useState([]);

  // Obtener clientes
  useEffect(() => {
    fetch('http://localhost:5000/api/clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al obtener clientes:", err));
  }, []);

  // Obtener vehículos
  useEffect(() => {
    fetch('http://localhost:5000/api/vehiculos')
      .then((res) => res.json())
      .then((data) => setVehiculos(data))
      .catch((err) => console.error("Error al obtener vehículos:", err));
  }, []);

  // Obtener reparaciones
  useEffect(() => {
    fetch('http://localhost:5000/api/reparaciones')
      .then((res) => res.json())
      .then((data) => setReparaciones(data))
      .catch((err) => console.error("Error al obtener reparaciones:", err));
  }, []);

  return (
    <>
      <h1>Taller Mecánico</h1>
      <p>Bienvenidos</p>

      <h2>Clientes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.email}</td>
              <td>{cliente.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Vehículos</h2>
      <ul>
        {vehiculos.map((vehiculo) => (
          <tr key={vehiculo.id}>
            {vehiculo.marca} {vehiculo.modelo} ({vehiculo.patente}) - Cliente ID: {vehiculo.cliente_id}
          </tr>
        ))}
      </ul>

      <h2>Reparaciones</h2>
      <ul>
        {reparaciones.map((reparacion) => (
          <tr key={reparacion.id}>
            {reparacion.fecha} - {reparacion.descripcion_problema} | Vehículo ID: {reparacion.vehiculo_id}
          </tr>
        ))}
      </ul>
    </>
  );
}

export default App;

