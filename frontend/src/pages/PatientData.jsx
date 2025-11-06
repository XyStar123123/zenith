import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, Calendar, Phone, MapPin, Activity, Eye, SquarePen, Search } from 'lucide-react'
import useUser from '../hooks/useUser'

function PatientData() {
  const { users } = useUser()
  const [searchTerm, setSearchTerm] = useState("")
  function handleSearch(e){
    setSearchTerm(e.target.value.toLowerCase())
  }
  const filteredUser = users.filter((user) => user.nama.toLowerCase().includes(searchTerm) || user.kode_pasien.toLowerCase().includes(searchTerm))
  return (
    <div className='lg:ms-70'>
      <div className='flex flex-col p-4 gap-3'>
        <div>
          <h1 className='text-2xl font-bold'>Data Pasien</h1>
          <p className='text-gray-500'>Kelola data pasien dan rekam medis</p>
        </div>
        <Link to={'/add-patient'} className='flex items-center gap-4 bg-blue-400 text-white px-6 py-3 rounded-md w-fit'>
          <UserPlus/>
          <p className='text-nowrap'>Tambah Pasien</p>
        </Link>
      </div>
      <div>
        
      </div>
      <div className='p-6 flex flex-col gap-5'>
        <div className='border border-gray-300 relative rounded-lg'>
          <Search className='absolute left-2 top-3 text-gray-500' size={20} />
          <input onChange={handleSearch} value={searchTerm} type="text" cl placeholder='Cari nama nama atau ID pasien...' className='w-full px-9 py-3 rounded-lg focus:outline focus:outline-blue-400 focus:outline-3 focus:outline-offset-3 transition all' />
        </div>
        <div className='grid w-full lg:grid-cols-2 gap-x-5 gap-y-5'>
          {filteredUser.map((user) =>
            <div className="card p-6 border border-gray-300 rounded-lg" key={user.id || user.kode_pasien}>
              <div>
                <div className="text-header">
                  <h2 className='text-lg font-semibold'>{user.nama}</h2>
                  <p className='text-gray-500'>ID: {user.kode_pasien}</p>
                </div>
              </div>
              <div className='flex flex-col gap-4 mt-5'>
                <p className='text-gray-500 flex items-center gap-3'>
                  <Calendar/>
                  <span className='text-black'>
                    {`${user.tempat_lahir}, ${new Date(user.tanggal_lahir).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                  </span>
                </p>
                <p className='flex items-center gap-3'>
                  <MapPin className='text-gray-500' />
                  {user.alamat}
                </p>
              </div>
              <div className='mt-6 pt-4 border-t border-gray-300 flex flex-col gap-5'>
                <div className='grid grid-cols-2 gap-x-3'>
                  <Link to={`/patient-detail/${user.kode_pasien}`} className='flex items-center gap-2 justify-center border border-gray-300 p-2 rounded-md'>
                    <Eye/>
                    Lihat
                  </Link>
                  <Link className='flex items-center gap-2 justify-center border border-gray-300 p-2 rounded-md'>
                    <SquarePen/>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default PatientData