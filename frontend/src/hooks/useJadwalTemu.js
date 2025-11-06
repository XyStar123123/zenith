import { useState, useEffect } from 'react'

export default function useJadwalTemu() {
  const [jadwalTemu, setJadwalTemu] = useState([])

  useEffect(() => {
    async function fetchJadwalTemu() {
      try {
        const res = await fetch('http://localhost:3000/api/v1/jadwal_temu')
        const data = await res.json()
        setJadwalTemu(data)
      } catch (err) {
        console.log('Error fetching jadwal temu', err)
      }
    }
    fetchJadwalTemu()
  }, [])

  return { jadwalTemu }
}