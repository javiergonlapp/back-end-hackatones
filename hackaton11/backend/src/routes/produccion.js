const Router = require("express");
const { getAllProduccion } = require("../controllers/produccion.controller");

const router = Router();

router.get("/", getAllProduccion);

module.exports = router;
