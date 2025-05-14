import express from "express";
import{connectDB} from "./config/dbConfig.mjs";
import Pais from "./models/Pais.mjs";
import paisesRoutes from "./routes/paisRoutes.mjs"
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
// import methodOverride from "method-override";


const app=express();
const PORT=process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(expressEjsLayouts);
app.set("layout","layout");

app.use("/", paisesRoutes);

connectDB();




app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
  });
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });