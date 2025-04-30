import { body } from "express-validator";

export const validationDataPaises = [
    body("official")
      .trim()
      .notEmpty()
      .withMessage("El nombre del País no puede estar vacío")
      .isLength({ min: 3, max: 90 })
      .withMessage("El nombre debe tener entre 3 y 90 caracteres"),
  
    body("common")
      .trim()
      .notEmpty()
      .withMessage("El nombre común no puede estar vacío")
      .isLength({ min: 3, max: 90 })
      .withMessage("El nombre común debe tener entre 3 y 90 caracteres"),
  
    body("area")
      .notEmpty()
      .withMessage("El área es obligatoria")
      .isFloat({ min: 0 })
      .withMessage("Debe ser un número positivo"),
  
    body("population")
      .notEmpty()
      .withMessage("La población es obligatoria")
      .isInt({ min: 0 })
      .withMessage("Debe ser un número entero positivo")
  ];

// export const validationDataSuperHeros = () => [
//   body("nombreSuperHeroe")
//     .trim()
//     .notEmpty()
//     .withMessage("El nombre del superheroe es requerido y no puede estar vacio")
//     .isLength({ min: 3, max: 60 })
//     .withMessage("El nombre del superheroe debe tener entre 3 y 60 caracteres"),

//   body("nombreReal")
//     .trim()
//     .notEmpty()
//     .withMessage("El nombre real es requerido y no puede estar vacio")
//     .isLength({ min: 3, max: 60 })
//     .withMessage("El nombre real debe tener entre 3 y 60 caracteres"),

//   body("edad")
//     .trim()
//     .notEmpty()
//     .withMessage("La edad es requerida y no puede estar vacia")
//     .custom((value) => {
//       const numValue = Number(value);
//       if (isNaN(numValue)) throw new Error("La edad debe ser un número válido");
//       if (!Number.isInteger(numValue))
//         throw new Error("La edad debe ser un número entero");
//       if (numValue < 0) throw new Error("La edad no puede ser negativa");
//       return true;
//     }),

//   body("poderes")
//     .isArray({ min: 1 })
//     .withMessage("Poderes debe ser un array con al menos un elemento")
//     .custom((arr) => {
//       if (
//         arr.some((p) => typeof p !== "string" || p.length < 3 || p.length > 60)
//       ) {
//         throw new Error(
//           "Cada poder debe ser un string entre 3 y 60 caracteres"
//         );
//       }
//       return true;
//     }),

//   body("aliados")
//     .isArray({ min: 1 })
//     .withMessage("Aliados debe ser un array con al menos un elemento")
//     .custom((arr) => {
//       if (
//         arr.some((a) => typeof a !== "string" || a.length < 3 || a.length > 60)
//       ) {
//         throw new Error(
//           "Cada aliado debe ser un string entre 3 y 60 caracteres"
//         );
//       }
//       return true;
//     }),

//   body("enemigos")
//     .isArray({ min: 1 })
//     .withMessage("Enemigos debe ser un array con al menos un elemento")
//     .custom((arr) => {
//       if (
//         arr.some((e) => typeof e !== "string" || e.length < 3 || e.length > 60)
//       ) {
//         throw new Error(
//           "Cada enemigo debe ser un string entre 3 y 60 caracteres"
//         );
//       }
//       return true;
//     }),

//   body("creador")
//     .trim()
//     .notEmpty()
//     .withMessage("El creador es requerido y no puede estar vacío")
//     .isLength({ min: 3, max: 60 })
//     .withMessage("El creador debe tener entre 3 y 60 caracteres"),
// ];
