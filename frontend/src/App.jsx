import React, { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import PatientData from './pages/PatientData'
import PatientRegistration from './pages/PatientRegistration'
import PatientDetail from './pages/PatientDetail'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddMedicalRecord from './pages/AddMedicalRecord'
import AddPatient from './pages/AddPatient'
import EditPatient from './pages/EditPatient'
import Login from './pages/Login'
import AddAppointment from './pages/AddAppointment'
import AppointmentAll from './pages/AppointmentAll'
import AppointmentThisDay from './pages/AppointmentThisDay'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dataDokter, setDataDokter] = useState({
    nama_dokter: localStorage.getItem('nama_dokter')
  })

  const storedLoggedIn = localStorage.getItem('isLoggedIn')

  useEffect(()=>{
    if(storedLoggedIn === 'true'){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, [storedLoggedIn])
  return (
    <div className='bg-white h-fit'>
      {isLoggedIn ? 
        <>
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path='/' element={<Dashboard dataDokter = {dataDokter} />} ></Route>
          <Route path='/dashboard' element={<Dashboard/>} ></Route>
          <Route path='/home' element={<Dashboard/>} ></Route>
          <Route path='/patient' element={<PatientData/>} ></Route>
          <Route path='/add-patient' element={<AddPatient/>} ></Route>
          <Route path='/edit-patient/:kode_pasien' element={<EditPatient/>} ></Route>
          <Route path='/add-medical-record/:kode_pasien' element={<AddMedicalRecord/>} ></Route>
          <Route path='/patient-detail/:kode_pasien' element={<PatientDetail/>} ></Route>
          <Route path='/jadwal-temu' element={<AppointmentAll/>}></Route>
          <Route path='/jadwal-temu-hari-ini' element={<AppointmentThisDay/>}></Route>
          <Route path='/add-jadwal-temu' element={<AddAppointment/>}></Route>
        </Routes>
        </>
        : 
        <Routes>
          <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
        </Routes>
      }
    </div>
  )
}

export default App