import express from "express";
import{connectDB} from "./config/dbConfig.mjs";
// import methodOverride from "method-override";


const app=express();
const PORT=process.env.PORT || 3500;

app.use(express.json());


connectDB();

// app.use(methodOverride("_method"));