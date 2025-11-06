const { getUsers, getSingleUser, createUser, updateUser, getUserCount } = require("./../controllers/usersController.js")
const express = require("express")
const router = express.Router()

router.get('/', getUsers)
router.get('/count', getUserCount)
router.get('/:kode_pasien', getSingleUser)
router.post('/', createUser)
router.put('/:kode_pasien', updateUser)

module.exports = router