import { connectDB } from "./config/dbConfig.mjs";
import { traerPaisesExternos, guardarPaisesFiltrados } from "./services/paisesExternosService.mjs";

async function main() {
  try {
    await connectDB(); // Primero conectar a la base

    const paisesFiltrados = await traerPaisesExternos();
    console.log(`Se filtraron ${paisesFiltrados.length} países.`);

    await guardarPaisesFiltrados(paisesFiltrados);
    console.log("Países guardados exitosamente.");

    process.exit(0); // Terminar bien
  } catch (error) {
    console.error("Error general:", error);
    process.exit(1); // Terminar mal
  }
}

main();