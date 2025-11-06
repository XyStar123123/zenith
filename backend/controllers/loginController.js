const pool = require("../config/db.js")

async function login(req, res){
    try{
        const { kode_dokter, nama } = req.body
        const [rows] = await pool.query("SELECT * FROM dokter WHERE kode_dokter = ?", [kode_dokter])
        const dokter = rows[0]

        if( nama !== dokter.nama && kode_dokter !== dokter.kode_dokter){
            return res.status(401).json({ message: 'Data dokter invalid' })
        }

        res.json({ message: 'Login success', dokter: { nama_dokter: dokter.nama } })
    } catch(err){
        res.status(500).json({ message: 'Account tidak ditemukan' })
    }
}

module.exports = { login }