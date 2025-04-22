
import React, { useState, useEffect } from 'react';
import './App.css';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  getVehiculos,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
  getReparaciones,
  createReparacion,
  updateReparacion,
  deleteReparacion,

} from './logica_crud.jsx'; // Importar funciones CRUD


function App() {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [reparaciones, setReparaciones] = useState([]);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    marca: '',
    modelo: '',
    patente: '',
    anio: '',
  });

  const [nuevaReparacion, setNuevaReparacion] = useState({
    descripcion_problema: '',
    costo: '',
    fecha: '',
  });

  const [paso, setPaso] = useState(1); 

  // Obtener datos del backend
  useEffect(() => {
    fetch('http://localhost:5000/api/clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al obtener clientes:", err));

    fetch('http://localhost:5000/api/vehiculos')
      .then((res) => res.json())
      .then((data) => setVehiculos(data))
      .catch((err) => console.error("Error al obtener vehículos:", err));

    fetch('http://localhost:5000/api/reparaciones')
      .then((res) => res.json())
      .then((data) => setReparaciones(data))
      .catch((err) => console.error("Error al obtener reparaciones:", err));
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paso === 1) {
      // Validar datos del cliente y pasar al siguiente paso
      setPaso(2);
    } else if (paso === 2) {
      // Validar datos del vehículo y pasar al siguiente paso
      setPaso(3);
    }
  }



  return (
    <>
      <h1>Taller Mecánico</h1>
      <p>Bienvenidos</p>

      {/* Formulario con pasos */}
      <form onSubmit={handleSubmit}>
        {paso === 1 && (
          <>
            <h2>Agregar Cliente</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoCliente.nombre}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={nuevoCliente.telefono}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={nuevoCliente.email}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Dirección"
              value={nuevoCliente.direccion}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
              required
            />
          </>
        )}

        {paso === 2 && (
          <>
            <h2>Agregar Vehículo</h2>
            <input
              type="text"
              placeholder="Marca"
              value={nuevoVehiculo.marca}
              onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, marca: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Modelo"
              value={nuevoVehiculo.modelo}
              onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, modelo: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Patente"
              value={nuevoVehiculo.patente}
              onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, patente: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Año"
              value={nuevoVehiculo.anio}
              onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, anio: e.target.value })}
              required
            />
          </>
        )}

        {paso === 3 && (
          <>
            <h2>Agregar Reparación</h2>
            <input
              type="text"
              placeholder="Descripción del problema"
              value={nuevaReparacion.descripcion_problema}
              onChange={(e) => setNuevaReparacion({ ...nuevaReparacion, descripcion_problema: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Precio"
              value={nuevaReparacion.costo}
              onChange={(e) => setNuevaReparacion({ ...nuevaReparacion, costo: e.target.value })}
              required
            />
            <input
              type="date"
              value={nuevaReparacion.fecha}
              onChange={(e) => setNuevaReparacion({ ...nuevaReparacion, fecha: e.target.value })}
              required
            />
          </>
        )}

        <button type="submit">{paso === 3 ? 'Agregar' : 'Siguiente'}</button>
      </form>

      <h2>Datos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Vehículo</th>
            <th>Patente</th>
            <th>Reparación</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            const vehiculo = vehiculos.find((v) => v.cliente_id === cliente.id);
            const reparacion = vehiculo
              ? reparaciones.find((r) => r.vehiculo_id === vehiculo.id)
              : null;

            return (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td>{cliente.direccion}</td>
                <td>{vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : "N/A"}</td>
                <td>{vehiculo ? vehiculo.patente : "N/A"}</td>
                <td>{reparacion ? reparacion.descripcion_problema : "N/A"}</td>
                <td>{reparacion ? reparacion.fecha : "N/A"}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(cliente.id)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(cliente.id)}>
                    Eliminar
                  </button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;

