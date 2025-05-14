// ESTABLECE LA CONEXION CON LA BASE DE DATOS EM LA NUBE


import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js");
        console.log("Conexion exitosa a MongoDB...");
    }catch{
        console.error("Error al conectar con MongoDB:", error);
        process.exit(1);
    };
};