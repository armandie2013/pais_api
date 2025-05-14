import { body } from "express-validator";

export const validationDataPaises = () => [
 
  body("official")
    .trim()
    .notEmpty()
    .withMessage("El nombre oficial es obligatorio.")
    .isLength({ min: 3, max: 90 })
    .withMessage("El nombre oficial debe tener entre 3 y 90 caracteres."),

 
  body("capital")
    .custom((value) => {
      if (!value) return true;
      const capitals = Array.isArray(value) ? value : [value];
      if (capitals.some(cap => typeof cap !== "string" || cap.trim().length < 3 || cap.trim().length > 90)) {
        throw new Error("Cada capital debe tener entre 3 y 90 caracteres.");
      }
      return true;
    }),

  // Valida que este mayusculas ARG
  body("borders")
    .custom((value) => {
      if (!value) return true;
      const borders = Array.isArray(value) ? value : value.split(",");
      const regex = /^[A-Z]{3}$/;
      if (borders.some(code => !regex.test(code.trim()))) {
        throw new Error("Cada frontera debe ser un código de 3 letras mayúsculas (ej: ARG, BRA).");
      }
      return true;
    }),

  
  body("area")
    .notEmpty()
    .withMessage("El área es obligatoria.")
    .custom(value => {
      const num = parseFloat(value);
      if (isNaN(num) || num < 0) throw new Error("El área debe ser un número positivo.");
      return true;
    }),

  
  body("population")
    .notEmpty()
    .withMessage("La población es obligatoria.")
    .custom(value => {
      const num = Number(value);
      if (!Number.isInteger(num) || num < 0) throw new Error("La población debe ser un número entero positivo.");
      return true;
    }),

];