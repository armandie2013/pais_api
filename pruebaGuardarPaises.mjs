import mongoose from "mongoose";
import { traerPaisesExternos, guardarPaisesFiltrados } from "./services/paisService.mjs";


await mongoose.connect("mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js");

async function probarGuardar() {
  try {
    const paisesFiltrados = await traerPaisesExternos();

    console.log(`🎯 Cantidad de países filtrados: ${paisesFiltrados.length}`);

    if (paisesFiltrados.length === 0) {
      console.log("⚠️ No hay países filtrados. No se guarda nada.");
    } else {
      await guardarPaisesFiltrados(paisesFiltrados);
      console.log("✅ Paises filtrados guardados correctamente en MongoDB");
    }

  } catch (error) {
    console.error("❌ Error al guardar países:", error);
  } finally {
    mongoose.connection.close();
  }
}

probarGuardar();