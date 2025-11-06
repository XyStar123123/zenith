import React, { useState, useEffect } from 'react'
import useSingleUser from '../hooks/useSingleUser'
import { UserPlus, FileText } from 'lucide-react'
import { useParams } from 'react-router-dom'

function AddMedicalRecord() {
  const { singleUser } = useSingleUser()
  const { kode_pasien } = useParams()

  const [formData, setFormData] = useState({
    pasienId: "",
    riwayat_penyakit: "",
    tekanan_darah: "",
    denyut_nadi: "",
    suhu: "",
    berat_badan: "",
    pemeriksaan_penunjang: "",
    diagnosa: "",
    terapi_dan_anjuran: "",
    resep_obat: "",
    dokterId: 1
  })

  useEffect(() => {
    if (singleUser?.pasien_id) {
      setFormData(prev => ({ ...prev, pasienId: singleUser.pasien_id }))
    }
  }, [singleUser])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/v1/rekam_medis', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      alert(data.message)
    } catch (err) {
      console.log(err)
      alert("Error submitting rekam medis")
    }
  }

  return (
    <div className='p-6 flex flex-col gap-3 lg:ms-70'>
      <div>
        <h1 className='text-2xl font-bold'>Tambah Rekam Medis</h1>
        <p className='text-gray-500'>Tambah rekam medis baru untuk {singleUser?.nama}</p>
      </div>
      <div className='flex flex-col gap-6 border border-gray-300 rounded-md p-6'>
        <div className='flex items-center gap-2'>
          <UserPlus className='text-blue-500' />
          <h2 className='text-lg font-semibold'>Form Rekam Medis</h2>
        </div>
        <form className='p-2' method='post' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>

            <label className='font-semibold'>Riwayat Penyakit</label>
            <textarea name="riwayat_penyakit" placeholder='Masukkan Riwayat Penyakit Pasien'
              value={formData.riwayat_penyakit} onChange={handleChange} />

            <label className='font-semibold'>Tekanan Darah</label>
            <input type="text" name="tekanan_darah" placeholder='120/80'
              value={formData.tekanan_darah} onChange={handleChange} />

            <label className='font-semibold'>Denyut Nadi</label>
            <input type="text" name="denyut_nadi" placeholder='70 bpm'
              value={formData.denyut_nadi} onChange={handleChange} />

            <label className='font-semibold'>Suhu</label>
            <input type="text" name="suhu" placeholder='36.5 °C'
              value={formData.suhu} onChange={handleChange} />

            <label className='font-semibold'>Berat Badan</label>
            <input type="text" name="berat_badan" placeholder='60 kg'
              value={formData.berat_badan} onChange={handleChange} />

            <label className='font-semibold'>Pemeriksaan Penunjang</label>
            <textarea name="pemeriksaan_penunjang" placeholder='Masukkan Hasil Pemeriksaan Penunjang'
              value={formData.pemeriksaan_penunjang} onChange={handleChange} />

            <label className='font-semibold'>Diagnosa</label>
            <input type="text" name="diagnosa" placeholder='Diagnosa akhir'
              value={formData.diagnosa} onChange={handleChange} />

            <label className='font-semibold'>Terapi dan Anjuran</label>
            <textarea name="terapi_dan_anjuran" placeholder='Masukkan Terapi dan Anjuran'
              value={formData.terapi_dan_anjuran} onChange={handleChange} />

            <label className='font-semibold'>Resep Obat</label>
            <textarea name="resep_obat" placeholder='Masukkan Resep Obat'
              value={formData.resep_obat} onChange={handleChange} />

            <button className='mt-5 flex items-center justify-center py-2 w-full bg-blue-400 text-white rounded-md' type='submit'>
              <UserPlus />
              Simpan Rekam Medis
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMedicalRecord