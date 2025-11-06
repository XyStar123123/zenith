const { getRekamMedisByKodePasien, getRekamMedis, createRekamMedis, getRekamCount } = require("./../controllers/rekamMedisController")
const express = require("express")
const router = express.Router()

router.get('/:kode_pasien/all', getRekamMedis)
router.get('/:kode_pasien/latest', getRekamMedisByKodePasien)
router.get('/count', getRekamCount)
router.post('/', createRekamMedis)

module.exports = router