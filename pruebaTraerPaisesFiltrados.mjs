async function traerPaisesConIdiomaEspanol() {
    try {
      const respuesta = await fetch('https://restcountries.com/v3.1/all');
      const paises = await respuesta.json();
  
      const paisesFiltrados = paises.filter(pais => pais.languages && pais.languages.spa);
  
      console.log(`✅ Cantidad de países que hablan español: ${paisesFiltrados.length}`);
      console.log("Ejemplo de un país:", paisesFiltrados[0]);
    } catch (error) {
      console.error("❌ Error al traer países:", error);
    }
  }
  
  traerPaisesConIdiomaEspanol();