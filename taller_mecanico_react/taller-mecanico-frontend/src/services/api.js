const API_BASE = "http://localhost:5000/api";

// Clientes
export const fetchClientes = async () => {
  const res = await fetch(`${API_BASE}/clientes/`);
  return res.json();
};

export const createCliente = async (cliente) => {
  const res = await fetch(`${API_BASE}/clientes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  return res.json();
};

// Vehículos
export const fetchVehiculos = async () => {
  const res = await fetch(`${API_BASE}/vehiculos/`);
  return res.json();
};

export const createVehiculo = async (vehiculo) => {
  const res = await fetch(`${API_BASE}/vehiculos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  return res.json();
};

// Reparaciones
export const fetchReparaciones = async () => {
  const res = await fetch(`${API_BASE}/reparaciones/`);
  return res.json();
};

export const createReparacion = async (reparacion) => {
  const res = await fetch(`${API_BASE}/reparaciones/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reparacion),
  });
  return res.json();
};

// Actualizar una reparación
export const updateReparacion = async (id, reparacion) => {
  const res = await fetch(`${API_BASE}/reparaciones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reparacion),
  });
  return res.json();
};

// Eliminar una reparación
export const deleteReparacion = async (id) => {
  const res = await fetch(`${API_BASE}/reparaciones/${id}`, {
    method: "DELETE",
  });
  return res.json();
};