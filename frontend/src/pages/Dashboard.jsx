import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, UserPlus, FileText, Calendar, Clock3 } from 'lucide-react'
import useJadwalTemu from '../hooks/useJadwalTemu'

function Dashboard({ dataDokter }) {
  const { jadwalTemu } = useJadwalTemu()
  const [rekamCount, setRekamCount] = useState(0)
  const [pasienCount, setPasienCount] = useState(0)

  const pasienHariIni = jadwalTemu.filter(a => a.status !== 'Selesai')

  useEffect(() => {
    async function fetchRekamCount() {
      try {
        const res = await fetch('http://localhost:3000/api/v1/rekam_medis/count')
        const data = await res.json()
        setRekamCount(data.total)
      } catch (err) {
        console.log('Error fetching rekam medis count', err)
      }
    }
    fetchRekamCount()
  }, [])

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const res = await fetch('http://localhost:3000/api/v1/users/count')
        const data = await res.json()
        setPasienCount(data.total)
      } catch (err) {
        console.log('Error fetching users count', err)
      }
    }
    fetchUserCount()
  }, [])

  const statusColors = {
    'Selesai': 'bg-green-100 text-green-500',
    'Batal': 'bg-red-100 text-red-500',
    'Proses': 'bg-yellow-100 text-yellow-500'
  }

  return (
    <div className='p-5 grid grid-cols-1 gap-y-10 overflow-x-hidden lg:ms-70'>
      <div className='bg-gradient-to-br from-blue-400 to-green-400 text-white p-6 rounded-lg'>
        <h1 className='text-xl font-bold'>Selamat Datang, {dataDokter.nama_dokter}.</h1>
        <p>Hari ini anda memiliki {pasienHariIni.length} pasien yang sudah diproses</p>
      </div>

      <div className='grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1 lg:grid-cols-3'>
        <div className='border border-gray-300 p-6 flex items-center justify-between rounded-lg'>
          <div>
            <p className='text-gray-400'>Total Pasien</p>
            <h1 className='text-2xl font-bold'>{pasienCount}</h1>
            <p className='text-green-300'>+12% dari bulan lalu</p>
          </div>
          <div className='flex justify-center items-center bg-blue-100 rounded-full p-3'>
            <Users className='text-blue-500' size={24} />
          </div>
        </div>

        <div className='border border-gray-300 p-6 flex items-center justify-between rounded-lg'>
          <div>
            <p className='text-gray-400'>Pasien Hari Ini</p>
            <h1 className='text-2xl font-bold'>{pasienHariIni.length}</h1>
            <p className='text-green-300'>+12% dari bulan lalu</p>
          </div>
          <div className='flex justify-center items-center bg-green-100 rounded-full p-3'>
            <UserPlus className='text-green-500' size={24} />
          </div>
        </div>

        <div className='border border-gray-300 p-6 flex items-center justify-between rounded-lg'>
          <div>
            <p className='text-gray-400'>Rekam Medis</p>
            <h1 className='text-2xl font-bold'>{rekamCount}</h1>
            <p className='text-green-300'>+8% dari bulan lalu</p>
          </div>
          <div className='flex justify-center items-center bg-green-100 rounded-full p-3'>
            <FileText className='text-green-500' size={24} />
          </div>
        </div>
      </div>

      {/* Tabel Pasien Hari Ini, keep your style */}
      <div className='p-6 border border-gray-300 rounded-lg flex flex-col gap-5'>
        <div className='flex items-center gap-3'>
          <Users className='text-blue-500'/>
          <h1 className='text-xl font-semibold'>Pasien Hari Ini</h1>
        </div>
        <div className='flex flex-col p-3 gap-5'>
          {pasienHariIni.map(p => (
            <div key={p.id} className='flex items-center justify-between'>
              <div>
                <h2 className='text-md font-semibold'>{p.nama}</h2>
                <p className='text-gray-500'>{p.kode_pasien}</p>
              </div>
              <div className='flex items-center gap-2'>
                <p className={`px-2 py-1 rounded-full font-semibold ${statusColors[p.status]}`}>{p.status}</p>
                <div className='flex items-center gap-2'>
                  <Clock3 size={20} className='text-gray-500'/>
                  <span>{p.waktu_temu}</span>
                </div>
                <Link
                  to={`/patient-detail/${p.kode_pasien}`}
                  className='p-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white'
                >
                  Rekam Medis
                </Link>
              </div>
            </div>
          ))}
          {pasienHariIni.length === 0 && (
            <p className='text-center text-gray-500'>Tidak ada pasien hari ini</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard