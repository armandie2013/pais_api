import {
  guardarPais,
  actualizarPaisPorId,
  obtenerPaisPorId as obtenerPaisPorIdRepo, eliminarPaisPorId
} from "../repositories/paisRepository.mjs";

export async function crearNuevoPais(datosPais) {
  return await guardarPais(datosPais);
}

export async function editarPais(id, datos) {
  return await actualizarPaisPorId(id, datos);
}

export async function obtenerPaisPorId(id) {
  return await obtenerPaisPorIdRepo(id);
}

export async function eliminarPais(id) {
  return await eliminarPaisPorId(id);
}