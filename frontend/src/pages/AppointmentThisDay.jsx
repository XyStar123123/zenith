// Appointment.jsx
import React, { useState } from 'react'
import { Clock3, PlusCircle, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import useJadwalTemu from '../hooks/useJadwalTemu'
import useUser from '../hooks/useUser'

function AppointmentThisDay() {
  const { jadwalTemu } = useJadwalTemu()
  const { users } = useUser()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAppointments = jadwalTemu.filter(a => a.status === 'Proses').filter(a => {
    const pasien = users.find(u => u.kode_pasien === a.kode_pasien);
    const nama = jadwalTemu.nama?.toLowerCase() || "";
    const kode = a.kode_pasien?.toLowerCase() || "";
    return nama.includes(searchTerm) || kode.includes(searchTerm);
  });


  const statusColors = {
    'Proses': 'bg-yellow-100 text-yellow-500',
    'Selesai': 'bg-green-100 text-green-500'
  }

  return (
    <div className='p-6 lg:ms-70'>
      <div className='flex flex-col gap-3 mb-5'>
        <h1 className='text-2xl font-bold'>Jadwal Temu Hari Ini</h1>
        <p className='text-gray-500'>Kelola jadwal pasien hari ini</p>
        <div className='flex items-center justify-between'>
            <input
            type="text"
            placeholder='Cari pasien atau ID...'
            className='border border-gray-300 rounded-md p-2 w-full max-w-sm'
            onChange={e => setSearchTerm(e.target.value.toLowerCase())}
            />
            <Link to={'/add-jadwal-temu'} className='bg-blue-500 text-white p-2 rounded-md flex items-center gap-2'>
                <PlusCircle/>
                <p>Tambah Jadwal Temu</p>
            </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-5'>
        {filteredAppointments.map(app => {
          const jadTem = jadwalTemu.find(u => u.kode_pasien === app.kode_pasien)
          return (
            <div key={app.id} className='p-6 border border-gray-300 rounded-lg flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <div className='h-12 w-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center'>
                  <User size={24} />
                </div>
                <div>
                  <h2 className='font-semibold text-lg'>{app.nama || 'Pasien tidak ditemukan'}</h2>
                  <p className='text-gray-500'>ID: {app.kode_pasien}</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <p className={`px-3 py-1 rounded-full font-semibold ${statusColors[app.status]}`}>
                  {app.status}
                </p>
                <div className='flex items-center gap-2'>
                  <Clock3 size={20} className='text-gray-500'/>
                  <span className='font-semibold'>{app.waktu_temu}</span>
                </div>
                <Link
                  to={`/patient-detail/${app.kode_pasien}`}
                  className='p-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white'
                >
                  Rekam Medis
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AppointmentThisDay