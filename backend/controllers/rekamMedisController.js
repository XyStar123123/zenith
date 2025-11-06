const pool = require("./../config/db.js")

async function getRekamMedisByKodePasien(req, res) {
  try {
    const { kode_pasien } = req.params;
    const [rows] = await pool.query(`
      SELECT 
        r.id AS rekam_id,
        r.tanggal_kunjungan,
        r.riwayat_penyakit,
        r.tekanan_darah,
        r.denyut_nadi,
        r.suhu,
        r.berat_badan,
        r.pemeriksaan_penunjang,
        r.diagnosa,
        r.terapi_dan_anjuran,
        r.resep_obat,
        r.dibuat_pada
      FROM rekam_medis r
      INNER JOIN pasien p ON p.id = r.pasien_id
      WHERE p.kode_pasien = ?
      ORDER BY r.tanggal_kunjungan DESC
      LIMIT 1
    `, [kode_pasien]);

    res.json(rows[0] || null);
  } catch (err) {
    console.error("Fetch gagal dari rekam_medis", err);
    res.status(500).json({ message: "Fetch gagal rekam medis" });
  }
}

async function getRekamMedis(req, res){
  try{
    const { kode_pasien } = req.params
    const [rows] = await pool.query(`
    SELECT 
        r.id AS rekam_id,
        r.tanggal_kunjungan,
        r.riwayat_penyakit,
        r.tekanan_darah,
        r.denyut_nadi,
        r.suhu,
        r.berat_badan,
        r.pemeriksaan_penunjang,
        r.diagnosa,
        r.terapi_dan_anjuran,
        r.resep_obat,
        r.dibuat_pada
      FROM rekam_medis r
      INNER JOIN pasien p ON p.id = r.pasien_id
      WHERE p.kode_pasien = ?
      ORDER BY r.tanggal_kunjungan DESC    
    `, [kode_pasien])

    res.json(rows)
  }catch(err){
    console.error(err)
    res.status(500).json({ message: "Fetch gagal rekam medis" });
  }
}

async function createRekamMedis(req, res) {
  try {
    const {
      pasienId,
      riwayat_penyakit,
      tekanan_darah,
      denyut_nadi,
      suhu,
      berat_badan,
      pemeriksaan_penunjang,
      diagnosa,
      terapi_dan_anjuran,
      resep_obat,
      dokterId
    } = req.body;

    await pool.query(
      `INSERT INTO rekam_medis
        (pasien_id, riwayat_penyakit, tekanan_darah, denyut_nadi, suhu, berat_badan, 
         pemeriksaan_penunjang, diagnosa, terapi_dan_anjuran, resep_obat, dokter_id, tanggal_kunjungan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        pasienId,
        riwayat_penyakit,
        tekanan_darah,
        denyut_nadi,
        suhu,
        berat_badan,
        pemeriksaan_penunjang,
        diagnosa,
        terapi_dan_anjuran,
        resep_obat,
        dokterId
      ]
    );

    await pool.query(
      `UPDATE jadwal_temu
       SET status = 'Selesai'
       WHERE id_pasien = ? AND status = 'Proses'`,
      [pasienId]
    );

    res.status(201).json({ message: "Rekam medis berhasil ditambahkan" });
  } catch (err) {
    console.error("Gagal tambah rekam medis:", err);
    res.status(500).json({ message: "Error tambah rekam medis" });
  }
}

async function getRekamCount(req, res) {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM rekam_medis");
    res.json({ total: rows[0].total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch count gagal" });
  }
}

module.exports = { getRekamMedisByKodePasien, getRekamMedis, createRekamMedis, getRekamCount };
