const { login } = require("./../controllers/loginController.js")
const express = require("express")
const router = express.Router()

router.post('/', login)
router.get('/', (req, res)=>{
    res.send('halo')
})

module.exports = router