import { guardarPaises, listarPaises } from "../repositories/paisRepository.mjs";

// Traer países de la API externa
export async function traerPaisesExternos() {
  const respuesta = await fetch('https://restcountries.com/v3.1/all');
  const paises = await respuesta.json();

  // Filtrar paises que tienen idioma español
  const paisesFiltrados = paises
    .filter(pais => pais.languages && pais.languages.spa)
    .map(pais => {
      const nuevoPais = { ...pais };

      // Eliminamos campos
      delete nuevoPais.translations;
      delete nuevoPais.tld;
      delete nuevoPais.cca2;
      delete nuevoPais.ccn3;
      delete nuevoPais.cca3;
      delete nuevoPais.cioc;
      delete nuevoPais.idd;
      delete nuevoPais.altSpellings;
      delete nuevoPais.car;
      delete nuevoPais.coatOfArms;
      delete nuevoPais.postalCode;
      delete nuevoPais.demonyms;

      // Agregamos campo adicional
      nuevoPais.creador = "Diego Cardenes";

      return nuevoPais;
    });

  return paisesFiltrados;
}

// Guardar los países filtrados en MongoDB
export async function guardarPaisesFiltrados(paisesFiltrados) {
  try {
    const resultado = await guardarPaises(paisesFiltrados);
    console.log(`${paisesFiltrados.length} países guardados exitosamente.`);
    return resultado;
  } catch (error) {
    console.error("Error al guardar los países:", error.message);
    throw error;
  }
}

// Listar los países ya guardados
export async function obtenerTodosLosPaises() {
  try {
    const paises = await listarPaises();
    return paises;
  } catch (error) {
    console.error("Error al listar los países:", error.message);
    throw error;
  }
}