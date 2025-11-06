import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

function AddAppointment() {
  const { users } = useUser()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pasienId: '',
    waktu_temu: '',
    status: 'Proses'
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/v1/jadwal_temu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      alert(data.message || 'Jadwal temu berhasil ditambahkan')
      navigate('/jadwal-temu')
    } catch (err) {
      console.error(err)
      alert('Gagal menambahkan jadwal temu')
    }
  }

  return (
    <div className="p-6 lg:ms-70">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Tambah Jadwal Temu</h1>
        <p className="text-gray-500">Buat jadwal temu baru untuk pasien</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-gray-300 p-6 rounded-md">
        <div>
          <label className="font-semibold">Pasien</label>
          <select
            name="pasienId"
            value={formData.pasienId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          >
            <option value="">Pilih Pasien</option>
            {users.map(u => (
              <option key={u.pasien_id} value={u.pasien_id}>
                {u.nama} ({u.kode_pasien})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Waktu Temu</label>
          <input
            type="time"
            name="waktu_temu"
            value={formData.waktu_temu}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          >
            <option value="Proses">Proses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md font-semibold">
          Simpan Jadwal Temu
        </button>
      </form>
    </div>
  )
}

export default AddAppointment