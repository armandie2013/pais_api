import Pais from "../models/Pais.mjs";

// Guardar múltiples países
export async function guardarPaises(paisesData) {
  return await Pais.insertMany(paisesData);
}

// Listar todos los países
export async function listarPaises() {
  return await Pais.find();
}