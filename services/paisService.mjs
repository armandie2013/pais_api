import { guardarPaises, listarPaises } from "../repositories/paisRepository.mjs";

//Traer paises de la API y filtrar solo los que tienen idioma español
export async function traerPaisesExternos() {
  const respuesta = await fetch('https://restcountries.com/v3.1/all');
  const paises = await respuesta.json();

  console.log(paises);

  // Filtramos paises que hablen sop antes
  const paisesFiltrados = paises
    .filter(pais => pais.languages && pais.languages.spa)
    .map(pais => {
      const nuevoPais = { ...pais };

      // Eliminamos campos solicitados
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

      // Agregamos el creador
      nuevoPais.creador = "Diego Cardenes";

      return nuevoPais;
    });

  return paisesFiltrados;
};

// Guardar paises filtrados en la base de datos
export async function guardarPaisesFiltrados(paisesFiltrados) {
  return await guardarPaises(paisesFiltrados);
};

// Obtener todos los paises ya guardados por las dudas
export async function obtenerTodosLosPaises() {
  return await listarPaises();
};