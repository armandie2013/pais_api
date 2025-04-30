import mongoose from "mongoose";

const paisSchema = new mongoose.Schema({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true },
    nativeName: { 
      type: mongoose.Schema.Types.Mixed 
    }
  },
  independent: { type: Boolean },
  status: { type: String },
  unMember: { type: Boolean },
  currencies: { 
    type: mongoose.Schema.Types.Mixed 
  },
  capital: [String],
  region: { type: String },
  subregion: { type: String },
  languages: { 
    type: mongoose.Schema.Types.Mixed
  },
  latlng: [Number],
  landlocked: { type: Boolean },
  borders: [String],
  area: { type: Number },
  flag: { type: String },
  maps: {
    googleMaps: { type: String },
    openStreetMaps: { type: String }
  },
  population: { type: Number },
  gini: { 
    type: mongoose.Schema.Types.Mixed
  },
  fifa: { type: String },
  timezones: [String],
  continents: [String],
  flags: {
    png: { type: String },
    svg: { type: String },
    alt: { type: String }
  },
  startOfWeek: { type: String },
  capitalInfo: {
    latlng: [Number]
  },
  creador: { type: String, default: "Diego Cardenes" }
}, {
  timestamps: true
});

const Pais = mongoose.model("Pais", paisSchema, "Grupo-05");
export default Pais;