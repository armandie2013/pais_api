  import {
    traerPaisesExternos,
    obtenerTodosLosPaises,
  } from "../services/paisesExternosService.mjs";
  import Pais from "../models/Pais.mjs";

  import { crearNuevoPais, obtenerPaisPorId, editarPais, eliminarPais } from "../services/paisService.mjs";

  export async function cargarPaisesController(req, res) {
    try {
      const paisesFiltrados = await traerPaisesExternos(); // Primero TRAE y FILTRA
      await guardarPaisesFiltrados(paisesFiltrados); // Despues GUARDA en la base
      res.send(
        "Paises con idioma español cargados correctamente en la base de datos."
      );
    } catch (error) {
      console.error("Error al cargar países:", error);
      res.status(500).send("Error al cargar países.");
    }
  }

  // Controlador para listar paises
  export async function listarPaisesController(req, res) {
    try {
      const paises = await Pais.find({
        creador: "Diego Cardenes",
        area: { $exists: true },
      });

      const navbarLinks = [
        { href: "/", text: "Pantalla Principal" },
        { href: "/paises/agregar", text: "Agregar Nuevo País" },
      ];

      res.render("dashboardPaises", {
        paises,
        navbarLinks,
        title: "Dashboard de Países",
      }); //renderiza dashboardPaises
    } catch (error) {
      console.error("Error al listar países:", error);
      res.status(500).send("Error al listar países.");
    }
  }

  // Mostrar el formulario de creación
  export function mostrarFormularioAgregarPais(req, res) {
    const navbarLinks = [
      { href: "/", text: "Pantalla Principal" },
      { href: "/paises/agregar", text: "Agregar Nuevo País" },
    ];
    res.render("crearNuevoPais", { navbarLinks, title: "Agregar Nuevo País" });
  }

  // Procesar el envío del formulario


  export async function procesarFormularioNuevoPais(req, res) {
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
        capitalLatlng
      } = req.body;

      const nuevoPais = {
        name: {
          common,
          official,
          nativeName: nativeName ? { spa: { official: nativeName, common: nativeName } } : {}
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
        borders: borders
          ? borders.split(",").map((b) => b.trim())
          : [],
        area: area ? parseFloat(area) : 0,
        flag: flagPng || "",
        maps: {
          googleMaps: mapsGoogle || "",
          openStreetMaps: mapsOSM || ""
        },
        population: population ? parseInt(population) : 0,
        gini: gini ? { "2019": parseFloat(gini) } : {},
        fifa: fifa || "",
        timezones: timezones
          ? timezones.split(",").map((tz) => tz.trim())
          : [],
        continents: continents
          ? continents.split(",").map((cont) => cont.trim())
          : [],
        flags: {
          png: flagPng || "",
          svg: flagSvg || "",
          alt: flagAlt || ""
        },
        startOfWeek: startOfWeek || "",
        capitalInfo: {
          latlng: capitalLatlng
            ? capitalLatlng.split(",").map((coord) => parseFloat(coord.trim()))
            : []
        },
        creador: "Diego Cardenes"
      };

      const paisCreado = await crearNuevoPais(nuevoPais);
      console.log("*****Pais creado:", paisCreado._id);

      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error al crear nuevo pais:", error);
      res.status(500).send("Error al crear nuevo país.");
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
    try {
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
        capitalLatlng
      } = req.body;

      const datosEditados = {
        name: {
          common,
          official,
          nativeName: nativeName ? { spa: { official: nativeName, common: nativeName } } : {}
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
        latlng: latlng ? latlng.split(",").map(c => parseFloat(c.trim())) : [],
        landlocked: landlocked === "true",
        borders: borders ? borders.split(",").map(b => b.trim()) : [],
        area: area ? parseFloat(area) : 0,
        population: population ? parseInt(population) : 0,
        gini: gini ? { "2019": parseFloat(gini) } : {},
        fifa,
        timezones: timezones ? timezones.split(",").map(tz => tz.trim()) : [],
        continents: continents ? continents.split(",").map(c => c.trim()) : [],
        flags: {
          png: flagPng,
          svg: flagSvg,
          alt: flagAlt
        },
        maps: {
          googleMaps: mapsGoogle,
          openStreetMaps: mapsOSM
        },
        startOfWeek,
        capitalInfo: {
          latlng: capitalLatlng ? capitalLatlng.split(",").map(coord => parseFloat(coord.trim())) : []
        }
      };

      await editarPais(req.params.id, datosEditados);
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error al editar país:", error);
      res.status(500).send("Error al editar país.");
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