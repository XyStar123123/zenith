import { useState, useEffect } from 'react'

export default function useUser(){
    const [users, setUsers] = useState([])
    useEffect(()=>{
        async function fetchUsers(){
            try{
                const users = await fetch('http://localhost:3000/api/v1/users')
                const data = await users.json()
                setUsers(data)
                console.log(users)
            }catch(err){
                console.log("Error while fetching from api", err)
            }
        }

        fetchUsers()
    }, [])
    return { users }
}