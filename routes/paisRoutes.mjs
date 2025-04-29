import express from "express";

import { listarPaisesController, mostrarFormularioAgregarPais, procesarFormularioNuevoPais } from "../controllers/paisController.mjs";

const router=express.Router();







// Mostrar el dashboard
router.get("/dashboard", listarPaisesController);

// Mostrar el formulario
router.get("/paises/agregar", mostrarFormularioAgregarPais);

// Procesar el formulario
router.post("/paises/agregar", procesarFormularioNuevoPais);

// router.get("/:id/editar", mostrarFormularioEditarPais);
// router.post("/:id/editar", procesarEdicionPais);









export default router;