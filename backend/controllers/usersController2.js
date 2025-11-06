const pool = require("./../config/db.js")

async function getUsers(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id AS pasien_id,
        p.kode_pasien,
        p.nama,
        p.nik,
        p.tanggal_lahir,
        p.tempat_lahir,
        p.alamat
      FROM pasien p
    `);
    res.json(rows);
  } catch (err) {
    console.error("Fetch gagal dari tabel pasien", err);
    res.status(500).json({ message: "Fetch gagal" });
  }
}

async function getSingleUser(req, res) {
  try {
    const { kode_pasien } = req.params;
    const [rows] = await pool.query(`
      SELECT 
        p.id AS pasien_id,
        p.kode_pasien,
        p.nama,
        p.nik,
        p.tanggal_lahir,
        p.tempat_lahir,
        p.alamat
      FROM pasien p
      WHERE p.kode_pasien = ?
    `, [kode_pasien]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Fetch single gagal", err);
    res.status(500).json({ message: "Fetch gagal" });
  }
}

module.exports = { getUsers, getSingleUsers }