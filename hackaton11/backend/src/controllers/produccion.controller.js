const Produccion = require("../models/Produccion");
const MateriaPrima = require("../models/MateriaPrima");
const Insumo = require("../models/Insumo");
const Personal = require("../models/Personal");

const getAllProduccion = async (req, res, next) => {
  try {
    const data = await Produccion.find()
      .populate("materiaPrimaUsada", "nombre cantidadRecibida")
      .populate("insumosUsados", "nombre cantidadRecibida")
      .populate("personalAsignado", "nombre apellido horasDisponibles")
      .sort({ createdAt: -1 });

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const createProduccion = async (req, res, next) => {

}

module.exports = { getAllProduccion };
