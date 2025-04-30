import express from "express";

import { listarPaisesController, mostrarFormularioAgregarPais, procesarFormularioNuevoPais, mostrarFormularioEditarPais, procesarEdicionPais, eliminarPaisController } from "../controllers/paisController.mjs";

const router=express.Router();







// Mostrar el dashboard
router.get("/dashboard", listarPaisesController);

// Mostrar el formulario
router.get("/paises/agregar", mostrarFormularioAgregarPais);

// Procesar el formulario
router.post("/paises/agregar", procesarFormularioNuevoPais);

// Mostra el formulario con los datos cargados para editar
router.get("/paises/:id/editar", mostrarFormularioEditarPais);

// Procesar la edicion
router.post("/paises/:id/editar", procesarEdicionPais);

// Eliminar registro
router.get("/paises/:id/eliminar", eliminarPaisController);









export default router;