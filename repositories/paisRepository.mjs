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