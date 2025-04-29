import express from "express";

import { listarPaisesController } from "../controllers/paisController.mjs";

const router=express.Router();








router.get("/dashboard", listarPaisesController);









export default router;