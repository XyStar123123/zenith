const express = require("express")
const router = express.Router()
const usersRoute = require("./users.js")
const rekamMedisRoute = require("./rekam_medis.js")
const loginRouter = require("./login.js")
const jadwalTemuRouter = require("./jadwal_temu.js")

router.get('/', (req, res) =>{
    res.send({ message: 'Entry point API' })
})
router.use("/users", usersRoute)
router.use("/rekam_medis", rekamMedisRoute)
router.use("/rekam_medis", rekamMedisRoute)
router.use("/login", loginRouter)
router.use('/jadwal_temu', jadwalTemuRouter)

module.exports = router