import {
  traerPaisesExternos,
  obtenerTodosLosPaises,
} from "../services/paisesExternosService.mjs";
import Pais from "../models/Pais.mjs";

import {
  crearNuevoPais,
  obtenerPaisPorId,
  editarPais,
  eliminarPais,
} from "../services/paisService.mjs";

export async function cargarPaisesController(req, res) {
  try {
    const paisesFiltrados = await traerPaisesExternos();
    await guardarPaisesFiltrados(paisesFiltrados);
    res.send("Paises con idioma español cargados correctamente en la base de datos.");
  } catch (error) {
    console.error("Error al cargar países:", error);
    res.status(500).send("Error al cargar países.");
  }
}

export async function listarPaisesController(req, res) {
  try {
    const paises = await Pais.find({
      creador: "Diego Cardenes",
      area: { $exists: true },
    });

    const navbarLinks = [
      { href: "/dashboard", text: "Pantalla Principal" },
      { href: "/paises/agregar", text: "Agregar Nuevo País" },
    ];

    res.render("dashboardPaises", {
      paises,
      navbarLinks,
      title: "Dashboard de Países",
    });
  } catch (error) {
    console.error("Error al listar países:", error);
    res.status(500).send("Error al listar países.");
  }
}

export function mostrarFormularioAgregarPais(req, res) {
  const navbarLinks = [
    { href: "/dashboard", text: "Pantalla Principal" },
    { href: "/paises/agregar", text: "Agregar Nuevo País" },
  ];
  res.render("crearNuevoPais", {
    navbarLinks,
    title: "Agregar Nuevo País",
    errores: [],
    datos: {},
  });
}

export async function procesarFormularioNuevoPais(req, res) {
  if (req.validationErrors) {
    return res.status(400).render("crearNuevoPais", {
      errores: req.validationErrors,
      datos: req.body,
      title: "Agregar Nuevo País",
      navbarLinks: [
        { href: "/dashboard", text: "Pantalla Principal" },
        { href: "/paises/agregar", text: "Agregar Nuevo País" },
      ],
    });
  }

  try {
    console.log("-------------Datos recibidos:", req.body);

    const {
      common,
      official,
      nativeName,
      independent,
      status,
      unMember,
      currencies,
      capital,
      region,
      subregion,
      languages,
      latlng,
      landlocked,
      borders,
      area,
      flagPng,
      flagSvg,
      flagAlt,
      mapsGoogle,
      mapsOSM,
      population,
      gini,
      fifa,
      timezones,
      continents,
      startOfWeek,
      capitalLatlng,
    } = req.body;

    const nuevoPais = {
      name: {
        common,
        official,
        nativeName: nativeName
          ? { spa: { official: nativeName, common: nativeName } }
          : {},
      },
      independent: independent === "true",
      status: status || "",
      unMember: unMember === "true",
      currencies: currencies ? { [currencies]: { name: currencies } } : {},
      capital: capital ? [capital] : [],
      region: region || "",
      subregion: subregion || "",
      languages: languages
        ? languages.split(",").reduce((acc, lang) => {
            acc[lang.trim()] = lang.trim();
            return acc;
          }, {})
        : {},
      latlng: latlng
        ? latlng.split(",").map((coord) => parseFloat(coord.trim()))
        : [],
      landlocked: landlocked === "true",
      borders: borders ? borders.split(",").map((b) => b.trim()) : [],
      area: area ? parseFloat(area) : 0,
      flag: flagPng || "",
      maps: {
        googleMaps: mapsGoogle || "",
        openStreetMaps: mapsOSM || "",
      },
      population: population ? parseInt(population) : 0,
      gini: gini ? { 2019: parseFloat(gini) } : {},
      fifa: fifa || "",
      timezones: timezones ? timezones.split(",").map((tz) => tz.trim()) : [],
      continents: continents ? continents.split(",").map((c) => c.trim()) : [],
      flags: {
        png: flagPng || "",
        svg: flagSvg || "",
        alt: flagAlt || "",
      },
      startOfWeek: startOfWeek || "",
      capitalInfo: {
        latlng: capitalLatlng
          ? capitalLatlng.split(",").map((coord) => parseFloat(coord.trim()))
          : [],
      },
      creador: "Diego Cardenes",
    };

    const paisCreado = await crearNuevoPais(nuevoPais);
    console.log("*****Pais creado:", paisCreado._id);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error al crear nuevo país:", error);

    res.status(500).render("crearNuevoPais", {
      errores: [{ msg: "Error interno al crear país: " + error.message }],
      datos: req.body,
      title: "Agregar Nuevo País",
      navbarLinks: [
        { href: "/dashboard", text: "Pantalla Principal" },
        { href: "/paises/agregar", text: "Agregar Nuevo País" },
      ],
    });
  }
}


// Mostrar formulario para editar get
export async function mostrarFormularioEditarPais(req, res) {
  try {
    const pais = await obtenerPaisPorId(req.params.id);
    if (!pais) return res.status(404).send("País no encontrado");

    res.render("editarPais", { pais, title: "Editar País" });
  } catch (error) {
    console.error("Error al mostrar el formulario:", error);
    res.status(500).send("Error al mostrar el formulario de edición.");
  }
}

// Edita post
export async function procesarEdicionPais(req, res) {
  if (req.validationErrors) {
    console.warn("Errores de validación:", req.validationErrors);

    return res.status(400).render("editarPais", {
      pais: {
        _id: req.params.id,
        name: {
          common: req.body.common,
          official: req.body.official,
          nativeName: req.body.nativeName
            ? { spa: { official: req.body.nativeName } }
            : {},
        },
        independent: req.body.independent === "true",
        unMember: req.body.unMember === "true",
        status: req.body.status,
        currencies: req.body.currencies
          ? { [req.body.currencies]: { name: req.body.currencies } }
          : {},
        capital: req.body.capital ? [req.body.capital] : [],
        region: req.body.region,
        subregion: req.body.subregion,
        latlng: req.body.latlng ? req.body.latlng.split(",").map(Number) : [],
        landlocked: req.body.landlocked === "true",
        borders: req.body.borders ? req.body.borders.split(",") : [],
        area: req.body.area,
        population: req.body.population,
        gini: req.body.gini ? { 2019: req.body.gini } : {},
        fifa: req.body.fifa,
        timezones: req.body.timezones ? req.body.timezones.split(",") : [],
        continents: req.body.continents ? req.body.continents.split(",") : [],
        flags: {
          png: req.body.flagPng,
          svg: req.body.flagSvg,
          alt: req.body.flagAlt,
        },
        maps: {
          googleMaps: req.body.mapsGoogle,
          openStreetMaps: req.body.mapsOSM,
        },
        startOfWeek: req.body.startOfWeek,
        capitalInfo: {
          latlng: req.body.capitalLatlng
            ? req.body.capitalLatlng.split(",").map(Number)
            : [],
        },
        creador: "Diego Cardenes",
      },
      errores: req.validationErrors,
      title: "Editar País",
      navbarLinks: [
        { href: "/dashboard", text: "Pantalla Principal" },
        { href: "/dashboard", text: "Volver al Dashboard" },
      ],
    });
  }

  try {
    console.log("➡️ Datos recibidos para editar:", req.body);
    const { id } = req.params;
    const {
      common,
      official,
      nativeName,
      independent,
      status,
      unMember,
      currencies,
      capital,
      region,
      subregion,
      languages,
      latlng,
      landlocked,
      borders,
      area,
      flagPng,
      flagSvg,
      flagAlt,
      mapsGoogle,
      mapsOSM,
      population,
      gini,
      fifa,
      timezones,
      continents,
      startOfWeek,
      capitalLatlng,
    } = req.body;

    const datosEditados = {
      name: {
        common,
        official,
        nativeName: nativeName
          ? { spa: { official: nativeName, common: nativeName } }
          : {},
      },
      independent: independent === "true",
      status,
      unMember: unMember === "true",
      currencies: currencies ? { [currencies]: { name: currencies } } : {},
      capital: capital ? [capital] : [],
      region,
      subregion,
      languages: languages
        ? languages.split(",").reduce((acc, lang) => {
            acc[lang.trim()] = lang.trim();
            return acc;
          }, {})
        : {},
      latlng: latlng ? latlng.split(",").map((c) => parseFloat(c.trim())) : [],
      landlocked: landlocked === "true",
      borders: borders ? borders.split(",").map((b) => b.trim()) : [],
      area: area ? parseFloat(area) : 0,
      population: population ? parseInt(population) : 0,
      gini: gini ? { 2019: parseFloat(gini) } : {},
      fifa,
      timezones: timezones ? timezones.split(",").map((tz) => tz.trim()) : [],
      continents: continents ? continents.split(",").map((c) => c.trim()) : [],
      flags: {
        png: flagPng,
        svg: flagSvg,
        alt: flagAlt,
      },
      maps: {
        googleMaps: mapsGoogle,
        openStreetMaps: mapsOSM,
      },
      startOfWeek,
      capitalInfo: {
        latlng: capitalLatlng
          ? capitalLatlng.split(",").map((coord) => parseFloat(coord.trim()))
          : [],
      },
      creador: "Diego Cardenes",
    };

    await editarPais(id, datosEditados);
    console.log("✅ País editado con éxito");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("❌ Error al editar país:", error.message);

    res.status(500).render("editarPais", {
      pais: { _id: req.params.id, ...req.body },
      errores: req.validationErrors,
      title: "Editar País",
      navbarLinks: [
        { href: "/dashboard", text: "Pantalla Principal" },
        { href: "/dashboard", text: "Volver al Dashboard" },
      ],
    });
  }
}

// Eliminar registro de la base de datos
export async function eliminarPaisController(req, res) {
  try {
    await eliminarPais(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error al eliminar país:", error);
    res.status(500).send("Error al eliminar país.");
  }
}

// Ver pais
export async function mostrarPaisController(req, res) {
  try {
    const pais = await obtenerPaisPorId(req.params.id);
    if (!pais) return res.status(404).send("País no encontrado");

    res.render("verPais", { pais, title: "Detalle del País" });
  } catch (error) {
    console.error("Error al mostrar país:", error);
    res.status(500).send("Error interno al mostrar país.");
  }
}