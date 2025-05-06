import React, { useEffect, useState } from "react";
import {
  fetchClientes,
  fetchVehiculos,
  fetchReparaciones,
} from "../../services/api";
import "./ClienteLista.css"; // Asegúrate de tener un archivo CSS para estilos

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [reparaciones, setReparaciones] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Estados para agregar/editar cliente y vehículos
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [vehiculosEdicion, setVehiculosEdicion] = useState([]);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteIdEdicion, setClienteIdEdicion] = useState(null);

  useEffect(() => {
    obtenerClientes();
    obtenerVehiculos();
    obtenerReparaciones();
  }, []);

  const obtenerClientes = async () => {
    try {
      const data = await fetchClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const obtenerVehiculos = async () => {
    try {
      const data = await fetchVehiculos();
      setVehiculos(data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const obtenerReparaciones = async () => {
    try {
      const data = await fetchReparaciones();
      setReparaciones(data);
    } catch (error) {
      console.error("Error al obtener reparaciones:", error);
    }
  };

  const toggleClienteSeleccionado = (clienteId) => {
    if (clienteSeleccionado === clienteId) {
      setClienteSeleccionado(null); // Cierra el menú desplegable si ya está abierto
    } else {
      setClienteSeleccionado(clienteId); // Abre el menú desplegable para el cliente seleccionado
    }
  };



  
  // Función para editar un cliente
  const handleEditarCliente = (cliente) => {
    setModoEdicion(true);
    setClienteIdEdicion(cliente.id);
    setNombre(cliente.nombre);
    setTelefono(cliente.telefono);
    setEmail(cliente.email);
    setDireccion(cliente.direccion);

    // Cargar los vehículos asociados al cliente
    const vehiculosCliente = vehiculos.filter((vehiculo) => vehiculo.cliente_id === cliente.id);
    setVehiculosEdicion(vehiculosCliente);
  };

  // Función para eliminar un cliente
  const handleEliminarCliente = async (clienteId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente y todos sus vehículos?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/clientes/${clienteId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Cliente eliminado correctamente");
          obtenerClientes(); // Actualiza la lista de clientes
          obtenerVehiculos(); // Actualiza la lista de vehículos
        } else {
          const errorData = await res.json();
          alert(`Error al eliminar el cliente: ${errorData.error || "Error desconocido"}`);
        }
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("Error al eliminar el cliente. Revisa la consola para más detalles.");
      }
    }
  };

  const handleAgregarClienteYVehiculo = async (e) => {
    e.preventDefault();
    if (!nombre || !telefono || !email || !direccion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (modoEdicion) {
        // Editar cliente
        const resCliente = await fetch(`http://localhost:5000/api/clientes/${clienteIdEdicion}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, telefono, email, direccion }),
        });

        if (!resCliente.ok) {
          alert("Error al actualizar el cliente");
          return;
        }

        // Editar vehículos asociados
        for (const vehiculo of vehiculosEdicion) {
          const resVehiculo = await fetch(`http://localhost:5000/api/vehiculos/${vehiculo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehiculo),
          });

          if (!resVehiculo.ok) {
            alert(`Error al actualizar el vehículo con ID ${vehiculo.id}`);
            return;
          }
        }

        alert("Cliente y vehículos actualizados correctamente");
      } else {
        // Crear cliente
        const resCliente = await fetch("http://localhost:5000/api/clientes/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, telefono, email, direccion }),
        });

        if (!resCliente.ok) {
          alert("Error al crear el cliente");
          return;
        }

        const cliente = await resCliente.json();

        // Crear vehículo asociado al cliente
        for (const vehiculo of vehiculosEdicion) {
          const resVehiculo = await fetch("http://localhost:5000/api/vehiculos/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...vehiculo, cliente_id: cliente.id }),
          });

          if (!resVehiculo.ok) {
            alert("Error al crear un vehículo");
            return;
          }
        }

        alert("Cliente y vehículos creados correctamente");
      }

      // Limpiar campos
      setNombre("");
      setTelefono("");
      setEmail("");
      setDireccion("");
      setVehiculosEdicion([]);
      setModoEdicion(false);
      setClienteIdEdicion(null);

      obtenerClientes();
      obtenerVehiculos();
    } catch (error) {
      console.error("Error al agregar o editar cliente y vehículo:", error);
    }
  };

  const handleAgregarVehiculo = () => {
    setVehiculosEdicion([
      ...vehiculosEdicion,
      { marca: "", modelo: "", patente: "", anio: "" },
    ]);
  };

  const handleEliminarVehiculo = (index) => {
    const nuevosVehiculos = vehiculosEdicion.filter((_, i) => i !== index);
    setVehiculosEdicion(nuevosVehiculos);
  };

  const handleVehiculoChange = (index, field, value) => {
    const nuevosVehiculos = [...vehiculosEdicion];
    nuevosVehiculos[index][field] = value;
    setVehiculosEdicion(nuevosVehiculos);
  };

  return (
    <div>
      <h2>Gestión de Clientes</h2>

      {/* Formulario para agregar/editar cliente y vehículo */}
      <form onSubmit={handleAgregarClienteYVehiculo}>
        <h3>{modoEdicion ? "Editar Cliente y Vehículos" : "Agregar Cliente y Vehículos"}</h3>
        <input
          type="text"
          placeholder="Nombre del Cliente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <h4>Vehículos</h4>
        {vehiculosEdicion.map((vehiculo, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Marca"
              value={vehiculo.marca}
              onChange={(e) => handleVehiculoChange(index, "marca", e.target.value)}
            />
            <input
              type="text"
              placeholder="Modelo"
              value={vehiculo.modelo}
              onChange={(e) => handleVehiculoChange(index, "modelo", e.target.value)}
            />
            <input
              type="text"
              placeholder="Patente"
              value={vehiculo.patente}
              onChange={(e) => handleVehiculoChange(index, "patente", e.target.value)}
            />
            <input
              type="number"
              placeholder="Año"
              value={vehiculo.anio}
              onChange={(e) => handleVehiculoChange(index, "anio", e.target.value)}
            />
            <button type="button" onClick={() => handleEliminarVehiculo(index)}>
              Eliminar Vehículo
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarVehiculo}>
          Agregar Vehículo
        </button>
        <button type="submit">{modoEdicion ? "Guardar Cambios" : "Agregar Cliente y Vehículos"}</button>
        {modoEdicion && (
          <button type="button" onClick={() => setModoEdicion(false)}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de clientes */}
      <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <React.Fragment key={cliente.id}>
              <tr>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td>{cliente.direccion}</td>
                <td>
                  <button onClick={() => toggleClienteSeleccionado(cliente.id)}>
                    {clienteSeleccionado === cliente.id ? "Cerrar" : "Ver Más"}
                  </button>
                  <button onClick={() => handleEditarCliente(cliente)}>Editar</button>
                  <button onClick={() => handleEliminarCliente(cliente.id)}>Eliminar</button>
                </td>
              </tr>
              {clienteSeleccionado === cliente.id && (
                <tr>
                  <td colSpan="5">
                    <div>
                      <h4>Vehículos</h4>
                      <ul>
                        {vehiculos
                          .filter((vehiculo) => vehiculo.cliente_id === cliente.id)
                          .map((vehiculo) => (
                            <li key={vehiculo.id}>
                              {vehiculo.marca} {vehiculo.modelo} - {vehiculo.patente} ({vehiculo.anio})
                            </li>
                          ))}
                      </ul>
                      <h4>Reparaciones</h4>
                      <ul>
                        {reparaciones
                          .filter((reparacion) =>
                            vehiculos.some(
                              (vehiculo) =>
                                vehiculo.id === reparacion.vehiculo_id &&
                                vehiculo.cliente_id === cliente.id
                            )
                          )
                          .map((reparacion) => (
                            <li key={reparacion.id}>
                              {reparacion.fecha}: {reparacion.descripcion_problema} - ${reparacion.costo}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;