// logica Crud
const API_BASE = 'http://localhost:5000/api';

export const getClientes = async () => {
  const res = await fetch(`${API_BASE}/clientes`);
  return await res.json();
};

export const createCliente = async (data) => {
  const res = await fetch(`${API_BASE}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateCliente = async (id, data) => {
  const res = await fetch(`${API_BASE}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteCliente = async (id) => {
  const res = await fetch(`${API_BASE}/clientes/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
};

// Repetimos lo mismo para vehículos
export const getVehiculos = async () => {
  const res = await fetch(`${API_BASE}/vehiculos`);
  return await res.json();
};

export const createVehiculo = async (data) => {
  const res = await fetch(`${API_BASE}/vehiculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateVehiculo = async (id, data) => {
  const res = await fetch(`${API_BASE}/vehiculos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteVehiculo = async (id) => {
  const res = await fetch(`${API_BASE}/vehiculos/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
};

// Y también para reparaciones
export const getReparaciones = async () => {
  const res = await fetch(`${API_BASE}/reparaciones`);
  return await res.json();
};

export const createReparacion = async (data) => {
  const res = await fetch(`${API_BASE}/reparaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateReparacion = async (id, data) => {
  const res = await fetch(`${API_BASE}/reparaciones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteReparacion = async (id) => {
  const res = await fetch(`${API_BASE}/reparaciones/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
};
