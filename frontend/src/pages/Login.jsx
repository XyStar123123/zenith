import { Activity, LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nama: '',
    kode_dokter: ''
  })

  function handleChange(e){
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  async function handleLogin(e){
    e.preventDefault()

    try{
        const loginData = await fetch('http://localhost:3000/api/v1/login', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })

        const res = await loginData.json()

        localStorage.setItem('isLoggedIn', "true")
        localStorage.setItem('nama_dokter', res.dokter.nama_dokter)
        setIsLoggedIn(true)
        navigate('/')
    } catch(err){
        console.error(err)
    }
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center gap-5'>
            <div className='flex flex-col gap-5 items-center'>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex justify-center items-center text-white">
                    <Activity size={40} />
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <h2 className='font-bold text-3xl'>Zenith</h2>
                    <h2 className='text-gray-500 text-2xl'>Sistem Rekam Medis Digital</h2>
                </div>
            </div>
            <form onSubmit={handleLogin} className='p-6 shadow-md w-100 max-w-100 rounded-md flex flex-col gap-6'>
                <div className='flex flex-col gap-3 items-center'>
                    <div className='flex gap-3 items-center text-3xl'>
                        <LogIn className='text-blue-500' />
                        <h2 className='font-semibold'>Masuk</h2>
                    </div>
                    <div className='text-gray-500 text-xl'>
                        <p>Masuk ke akun dokter Anda</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="" className='text-semibold'>Kode Masuk</label>
                        <input type="text" name='kode_dokter' className='outline outline-gray-300 w-full py-2 px-4' placeholder='KODE_SPESIAL_01283jhasdb912' onChange={handleChange} value={formData.kode_dokter} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="" className='text-semibold'>Nama Dokter</label>
                        <input type="text" name='nama' className='outline outline-gray-300 w-full py-2 px-4' placeholder='********' onChange={handleChange} value={formData.nama} />
                    </div>
                    <button className='bg-blue-400 flex justify-center items-center px-3 py-2 text-white rounded-md gap-2'>
                        <LogIn/>
                        Masuk
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login