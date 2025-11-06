import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PanelLeft, User, Users, UserRoundPlus, Activity, LayoutDashboard, LogIn, LogOut, Calendar, Calendar1 } from 'lucide-react'

function Navbar({ setIsLoggedIn }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sidebarRef = useRef(null)

  function handleLogout(){
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    navigate('/')
  }

  useEffect(()=>{
    function handleClickOutside(event){
        if(window.innerWidth < 1024){
            if(sidebarRef.current && !sidebarRef.current.contains(event.target)){
                setSidebarOpen(false)
                console.log(sidebarOpen)
            }
        }
    }

    if(sidebarOpen){
        document.addEventListener("mousedown", handleClickOutside)
    }

    return ()=>{
        document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  return (
    <>
      <div className={`fixed w-screen min-h-screen ${sidebarOpen ? 'bg-[rgba(0,0,0,.8)]' : 'hidden'}`}></div>
      <header className='border-b border-gray-400 lg:ms-70'>
        <nav className="bg-white w-full flex items-center justify-between p-5">
          <div className='flex items-center gap-5'>
            <button className='lg:hidden' onClick={() => window.innerWidth < 1024 ? setSidebarOpen(true) : null}>
                <PanelLeft size={20}/>
            </button>
            <h1 className='text-lg font-bold'>Zenith</h1>
          </div>
          <User></User>
        </nav>
        <aside className={`fixed top-0 left-0 min-h-screen bg-white w-70 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 lg:translate-x-0 shadow-[2px_0_6px_rgba(0,0,0,.1)]`} ref={sidebarRef} >
          <div className='flex items-center gap-4 border-b border-gray-400 p-5'>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-green-400 flex justify-center items-center text-white">
              <Activity size={20} />
            </div>
            <div>
              <h1 className='text-xl font-semibold'>Zenith</h1>
              <p className='text-sm text-gray-500'>Dashboard Dokter</p>
            </div>
          </div>
          <p className='px-5 text-gray-500 mt-4 font-semibold'>Menu Utama</p>
          <ul className='text-gray-500 px-5 py-5 flex flex-col gap-6'>
            <li>
              <Link className='flex flex items-center gap-3 shadow-[2px_0_0_gray] rounded-md p-2' to={'/'} onClick={() => setSidebarOpen(false)} >
                <LayoutDashboard/>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link className='flex flex items-center gap-3 shadow-[2px_0_0_gray] rounded-md p-2' to={'/patient'}  onClick={() => setSidebarOpen(false)}>
                <Users/>
                <span>Data Pasien</span>
              </Link>
            </li>
            <li>
              <Link className='flex flex items-center gap-3 shadow-[2px_0_0_gray] rounded-md p-2' to={'/jadwal-temu'}  onClick={() => setSidebarOpen(false)}>
                <Calendar/>
                <span>Jadwal Temu</span>
              </Link>
            </li>
            <li>
              <Link className='flex flex items-center gap-3 shadow-[2px_0_0_gray] rounded-md p-2' to={'/jadwal-temu-hari-ini'}  onClick={() => setSidebarOpen(false)}>
                <Calendar1/>
                <span>Jadwal Temu Hari Ini</span>
              </Link>
            </li>
            <li className='w-full'>
                <button onClick={handleLogout} className="flex flex items-center gap-3 shadow-[2px_0_0_gray] rounded-md p-2 w-full">
                    <LogOut/>
                    <span>Log Out</span>
                </button>
            </li>
          </ul>
        </aside>
      </header>
    </>
  )
}

export default Navbar