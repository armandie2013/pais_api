import { traerPaisesExternos, obtenerTodosLosPaises} from "../services/paisesExternosService.mjs";
import Pais from "../models/Pais.mjs";

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
    const paises = await Pais.find({
      creador:"Diego Cardenes",
      area:{$exists:true}
    });

    const navbarLinks = [
      { href: "/", text: "Pantalla Principal" },
      { href: "/paises/agregar", text: "Agregar Nuevo País" }
    ];
    
    res.render("dashboardPaises", { paises, navbarLinks, title: "Dashboard de Países" }); // 👈 importante: renderiza dashboardPaises
  } catch (error) {
    console.error("Error al listar países:", error);
    res.status(500).send("Error al listar países.");
  }
}