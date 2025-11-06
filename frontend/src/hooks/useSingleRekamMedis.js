import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function useSingleRekamMedis() {
  const [singleRekamMedis, setSingleRekamMedis] = useState({})
  const { kode_pasien } = useParams()

  useEffect(() => {
    async function fetchSingleRekamMedis() {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/rekam_medis/${kode_pasien}/latest`)
        const rekamMedis = await res.json()
        setSingleRekamMedis(rekamMedis)
      } catch (err) {
        console.error(err)
      }
    }

    if (kode_pasien) {
      fetchSingleRekamMedis()
    }
  }, [kode_pasien])

  return { singleRekamMedis }
}

export default useSingleRekamMedis