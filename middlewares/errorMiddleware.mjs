import { validationResult } from "express-validator";

// Middleware solo para crear país
export function handleValidationErrorsCreate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Errores de validación (crear):", errors.array());
      return res.status(400).render("crearNuevoPais", {
        errores: errors.array(),
        title: "Agregar Nuevo País",
        navbarLinks: [
          { href: "/", text: "Pantalla Principal" },
          { href: "/paises/agregar", text: "Agregar Nuevo País" }
        ]
      });
    }
    next();
  }
  
  // Middleware solo para editar país
  export function handleValidationErrorsEdit(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Errores de validación (editar):", errors.array());
      return res.status(400).render("editarPais", {
        errores: errors.array(),
        pais: {
          _id: req.params.id,
          ...req.body,
          name: {
            common: req.body.common,
            official: req.body.official,
            nativeName: req.body.nativeName
              ? { spa: { official: req.body.nativeName } }
              : {}
          },
          capital: req.body.capital ? [req.body.capital] : [],
          latlng: req.body.latlng ? req.body.latlng.split(",").map(Number) : [],
          capitalInfo: {
            latlng: req.body.capitalLatlng ? req.body.capitalLatlng.split(",").map(Number) : []
          },
          flags: {
            png: req.body.flagPng,
            svg: req.body.flagSvg,
            alt: req.body.flagAlt
          },
          maps: {
            googleMaps: req.body.mapsGoogle,
            openStreetMaps: req.body.mapsOSM
          }
        },
        title: "Editar País",
        navbarLinks: [
          { href: "/", text: "Pantalla Principal" },
          { href: "/dashboard", text: "Volver al Dashboard" }
        ]
      });
    }
    next();
  }