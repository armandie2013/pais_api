import { guardarPais } from "../repositories/paisRepository.mjs";

export async function crearNuevoPais(datosPais) {
  return await guardarPais(datosPais);
}