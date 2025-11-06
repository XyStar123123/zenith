import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function useSingleUser() {
  const [singleUser, setSingleUser] = useState([])
  const { kode_pasien } = useParams()

  useEffect(()=>{
    async function fetchSingleUser(){
        try{
            const res = await fetch(`http://localhost:3000/api/v1/users/${kode_pasien}`)
            const data = await res.json()
            setSingleUser(data)
        }catch(err){
            console.error("Error occured while fetching: ", err)
        }
    }

    if(kode_pasien){
        fetchSingleUser()
    }
  }, [kode_pasien])

  return { singleUser }
}

export default useSingleUser