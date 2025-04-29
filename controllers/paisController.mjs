import { traerPaisesExternos} from "../services/paisesExternosService.mjs";

export async function cargarPaisesController(req, res) {
  try {
    const paisesFiltrados = await traerPaisesExternos(); // Primero TRAE y FILTRA
    await guardarPaisesFiltrados(paisesFiltrados);       // Despues GUARDA en la base
    res.send("Paises con idioma español cargados correctamente en la base de datos.");
  } catch (error) {
    console.error("Error al cargar países:", error);
    res.status(500).send("Error al cargar países.");
  };
};

// Controlador para listar paises
export async function listarPaisesController(req, res) {
  try {
    const paises = await obtenerTodosLosPaises();
    res.render("paises", { paises });
  } catch (error) {
    console.error("Error al listar países:", error);
    res.status(500).send("Error al listar países.");
  };
};