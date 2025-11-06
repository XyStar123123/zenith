const pool = require("../config/db.js")

async function getJadwalTemu(req, res){
    try{
        const [rows] = await pool.query("SELECT jt.*, p.kode_pasien, p.nama FROM jadwal_temu jt JOIN pasien p ON(p.id=jt.id_pasien)")
        res.json(rows)
    }catch (err) {
        console.error("Fetch gagal dari tabel pasien", err);
        res.status(500).json({ message: "Fetch gagal" });
    }
}

async function createJadwalTemu(req, res){
    try{
        const {
            pasienId,
            waktu_temu,
            status
        } = req.body

        await pool.query("INSERT INTO jadwal_temu(id_pasien, waktu_temu, status) VALUES ( ?, ?, ? )", [pasienId, waktu_temu, status])
        res.status(201).json({ message: "Rekam medis berhasil ditambahkan" });
    } catch (err) {
        console.error("Gagal tambah jadwal temu:", err);
        res.status(500).json({ message: "Error tambah jadwal temu" });
    }
}


module.exports = { getJadwalTemu, createJadwalTemu }