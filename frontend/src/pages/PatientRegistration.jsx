import React, { useState } from 'react'
import { UserPlus, User, FileText } from 'lucide-react'

function PatientRegistration() {
  const [formData, setFormData] = useState({
    kodePasien: "",
    nama: "",
    nik: "",
    tanggalLahir: "",
    tempatLahir: "",
    alamat: "",
    riwayatPenyakit: "",
    pemeriksaanFisik: "",
    pemeriksaanPenunjang: "",
    diagnosa: "",
    terapiDanAnjuran: "",
    resepObat: ""
  })

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:5000/api/v1/users', {
        method: 'POST',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      alert(data.message)
    }catch(err){
      console.log(err)
      alert("Error submitting formData")
    }
  }

  // useEffect(()=>{
  //   console.log(formData)
  // }, [formData])
  return (
    <div className='p-6 flex flex-col gap-3'>
      <div>
        <h1 className='text-2xl font-bold'>Registrasi Pasien Baru</h1>
        <p className='text-gray-500'>Daftarkan pasien baru</p>
      </div>
      <div className='flex flex-col gap-6 border border-gray-300 rounded-md p-6'>
        <div className='flex items-center gap-2'>
          <UserPlus className='text-blue-500' />
          <h2 className='text-lg font-semibold'>Form Registrasi</h2>
        </div>
        <form className='p-2' method='post' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3'>
            <div>
              <div className='flex items-center gap-2 mb-6'>
                <User/>
                <h3 className='font-semibold'>Informasi Pasien</h3>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 gap-y-3'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='font-semibold'>Kode Pasien</label>
                    <input type="text" name='kodePasien' className='border border-gray-300 px-3 py-1 rounded-md focus:outline-blue-500 focus:outline-offset-2' value={formData.kodePasien} onChange={handleChange} placeholder='Kode Unik Pasien' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='font-semibold'>Nama Lengkap</label>
                    <input name='nama' type="text" className='border border-gray-300 px-3 py-1 rounded-md focus:outline-blue-500 focus:outline-offset-2' value={formData.nama} onChange={handleChange} placeholder='Masukkan Nama Lengkap Pasien' />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-y-3'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='font-semibold'>NIK</label>
                    <input type="text" name='nik' className='border border-gray-300 px-3 py-1 rounded-md focus:outline-blue-500 focus:outline-offset-2' placeholder='Masukkan 16 Digit NIK Pasien' value={formData.nik} onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='font-semibold'>Nama Lengkap</label>
                    <input type='date' name='tanggalLahir' className='border border-gray-300 px-3 py-1 rounded-md focus:outline-blue-500 focus:outline-offset-2' value={formData.tanggalLahir} onChange={handleChange} />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>Tempat Lahir</label>
                  <input type="text" name='tempatLahir' className='border border-gray-300 px-3 py-1 rounded-md focus:outline-blue-500 focus:outline-offset-2' value={formData.tempatLahir} onChange={handleChange} placeholder='Masukkan tempat lahir pasien' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>Alamat Lengkap</label>
                  <textarea type="text" name='alamat' className='border border-gray-300 px-3 py-1 rounded-md focus:outline-blue-500 focus:outline-offset-2' value={formData.alamat} onChange={handleChange} placeholder='Masukkan alamat pasien' rows={3} />
                </div>
              </div>
            </div>
            <div className='border-t border-gray-300 py-6 flex flex-col gap-6'>
              <div className='flex items-center gap-2'>
                <FileText />
                <h2 className='text-lg font-semibold'>Informasi Medis</h2>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>Riwayat Penyakit</label>
                  <textarea name="riwayatPenyakit" id="" placeholder='Masukkan Riwayat Penyakit Pasien' value={formData.riwayatPenyakit} onChange={handleChange} className='border border-gray-300 px-3 py-1 focus:outline-blue-500 focus:outline-offset-2' rows={4} />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>Pemeriksaan Fisik</label>
                  <textarea name="pemeriksaanFisik" id="" placeholder='Masukkan Hasil Pemeriksaan Fisik' value={formData.pemeriksaanFisik} onChange={handleChange} className='border border-gray-300 px-3 py-1 focus:outline-blue-500 focus:outline-offset-2' rows={4} />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>Pemeriksaan Penunjang</label>
                  <textarea name="pemeriksaanPenunjang" id="" placeholder='Masukkan Hasil Pemeriksaan Penunjang' value={formData.pemeriksaanPenunjang} onChange={handleChange} className='border border-gray-300 px-3 py-1 focus:outline-blue-500 focus:outline-offset-2' rows={4} />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>Terapi dan Anjuran</label>
                  <textarea name="terapiDanAnjuran" id="" placeholder='Masukkan Terapi dan Anjuran untuk pasien' value={formData.terapiDanAnjuran} onChange={handleChange} className='border border-gray-300 px-3 py-1 focus:outline-blue-500 focus:outline-offset-2' rows={4} />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>Resep Obat</label>
                  <textarea name="resepObat" id="" placeholder='Masukkan Resep Obat untuk pasien' value={formData.resepObat} onChange={handleChange} className='border border-gray-300 px-3 py-1 focus:outline-blue-500 focus:outline-offset-2' rows={4} />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="" className='font-semibold'>diagnosa</label>
                  <input name="diagnosa" id="" placeholder='Diagnosa akhir dari analisa penyakit dan konsultasi' value={formData.diagnosa} onChange={handleChange} className='border border-gray-300 px-3 py-1 focus:outline-blue-500 focus:outline-offset-2' rows={4} />
                </div>
                <button className='mt-5 flex items-center justify-center py-2 w-full bg-blue-400 text-white rounded-md' type='submit'>
                  <UserPlus />
                  Daftarkan Pasien
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PatientRegistration