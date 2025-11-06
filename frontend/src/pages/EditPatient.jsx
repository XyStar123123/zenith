import React, { useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'
import useSingleUser from '../hooks/useSingleUser'

function EditPatient() {
  const { singleUser } = useSingleUser()
  const [formData, setFormData] = useState({
    kode_pasien: singleUser.kode_pasien,
    nama: "",
    nik: "",
    tanggal_lahir: "",
    tempat_lahir: "",
    alamat: ""
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/v1/users/${singleUser.kode_pasien}`, {
        method: 'PUT',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      alert(data.message || "Pasien berhasil ditambahkan")
    } catch (err) {
      console.error(err)
      alert("Error submitting pasien")
    }
  }

  useEffect(()=>{
    if(singleUser.kode_pasien){
      const formatDate = singleUser.tanggal_lahir
      ? new Date(singleUser.tanggal_lahir).toISOString().split('T')[0]
      : ""
      setFormData({
        kode_pasien: singleUser.kode_pasien,
        nama: singleUser.nama || "",
        nik: singleUser.nik || "",
        tanggal_lahir: formatDate || "",
        tempat_lahir: singleUser.tempat_lahir || "",
        alamat: singleUser.alamat || ""
      })
    }
  }, [singleUser])

  return (
    <div className='p-6 flex flex-col gap-3 lg:ms-70'>
      <div>
        <h1 className='text-2xl font-bold'>Edit Pasien</h1>
        <p className='text-gray-500'>Mengedit data pasien</p>
      </div>
      <div className='flex flex-col gap-6 border border-gray-300 rounded-md p-6'>
        <div className='flex items-center gap-2'>
          <UserPlus className='text-blue-500' />
          <h2 className='text-lg font-semibold'>Form Pasien</h2>
        </div>
        <form className='p-2' method='post' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>

            <label className='font-semibold'>Kode Pasien</label>
            <input type="text" name="kode_pasien" placeholder='P001' readOnly
              value={formData.kode_pasien} onChange={handleChange} />

            <label className='font-semibold'>Nama</label>
            <input type="text" name="nama" placeholder='Nama lengkap'
              value={formData.nama} onChange={handleChange} />

            <label className='font-semibold'>NIK</label>
            <input type="text" name="nik" placeholder='Nomor Induk Kependudukan'
              value={formData.nik} onChange={handleChange} />

            <label className='font-semibold'>Tanggal Lahir</label>
            <input type="date" name="tanggal_lahir"
              value={formData.tanggal_lahir} onChange={handleChange} />

            <label className='font-semibold'>Tempat Lahir</label>
            <input type="text" name="tempat_lahir" placeholder='Kota/Kabupaten'
              value={formData.tempat_lahir} onChange={handleChange} />

            <label className='font-semibold'>Alamat</label>
            <textarea name="alamat" placeholder='Alamat lengkap'
              value={formData.alamat} onChange={handleChange} />

            <button className='mt-5 flex items-center justify-center py-2 w-full bg-green-500 text-white rounded-md' type='submit'>
              <UserPlus />
              Simpan Data Pasien
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPatient