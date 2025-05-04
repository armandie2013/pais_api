import { validationResult } from "express-validator";

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Errores de validación:", errors.array());
    req.validationErrors = errors.array();
  }
  next();
}