const express = require("express")
const { getJadwalTemu, createJadwalTemu } = require("../controllers/jadwalTemuController")
const router = express.Router()

router.get('/', getJadwalTemu)
router.post('/', createJadwalTemu)

module.exports = router