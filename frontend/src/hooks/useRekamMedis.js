import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function useRekamMedis() {
  const [rekamMedis, setRekamMedis] = useState({})
  const { kode_pasien } = useParams()
  useEffect(()=>{
    async function fetchRekamMedis() {
        const res = await fetch(`http://localhost:3000/api/v1/rekam_medis/${kode_pasien}/all`)
        const data = await res.json()
        setRekamMedis(data)
    }

    if(kode_pasien){
        fetchRekamMedis()
    }

  }, [kode_pasien])
  return { rekamMedis }
}

export default useRekamMedis