import Pais from "../models/Pais.mjs";

// Guardar multiples paises
export async function guardarPaises(paisesData) {
  return await Pais.insertMany(paisesData);
}

// Listar todos los paises
export async function listarPaises() {
  return await Pais.find();
}

// Guardar un solo pais
export async function guardarPais(paisData) {
  const nuevoPais = new Pais(paisData);
  return await nuevoPais.save();
}

// Obtener pais por id
export async function obtenerPaisPorId(id) {
  return await Pais.findById(id);
}

// Actualizar pais por id + datos
export async function actualizarPaisPorId(id, datos) {
  return await Pais.findByIdAndUpdate(id, datos, { new: true });
}

// Eliminar registro de la base de datos
export async function eliminarPaisPorId(id) {
  return await Pais.findByIdAndDelete(id);
}