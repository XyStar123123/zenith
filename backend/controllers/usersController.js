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

async function getUserCount(req, res) {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM pasien");
    res.json({ total: rows[0].total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch count gagal" });
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

async function createUser(req, res) {
  try {
    const { kode_pasien, nama, nik, tanggal_lahir, tempat_lahir, alamat } = req.body;

    if (!kode_pasien || !nama || !nik || !tanggal_lahir || !tempat_lahir || !alamat) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const [result] = await pool.query(`
      INSERT INTO pasien (kode_pasien, nama, nik, tanggal_lahir, tempat_lahir, alamat)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [kode_pasien, nama, nik, tanggal_lahir, tempat_lahir, alamat]);

    res.status(201).json({ message: "Pasien berhasil ditambahkan", pasienId: result.insertId });
  } catch (err) {
    console.error("Insert gagal", err);
    res.status(500).json({ message: "Insert gagal" });
  }
}

async function updateUser(req, res) {
  try {
    const { kode_pasien, nama, nik, tanggal_lahir, tempat_lahir, alamat } = req.body;

    if (!kode_pasien || !nama || !nik || !tanggal_lahir || !tempat_lahir || !alamat) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const [result] = await pool.query(`
      UPDATE pasien 
      SET nama = ?, nik = ?, tanggal_lahir = ?, tempat_lahir = ?, alamat = ?
      WHERE kode_pasien = ?
    `, [nama, nik, tanggal_lahir, tempat_lahir, alamat, kode_pasien]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    }

    res.status(200).json({ message: "Pasien berhasil diperbarui" });
  } catch (err) {
    console.error("Update gagal", err);
    res.status(500).json({ message: "Update gagal" });
  }
}


module.exports = { getUsers, getSingleUser, createUser, updateUser, getUserCount }