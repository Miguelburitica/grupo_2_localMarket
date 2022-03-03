import { useState, useEffect } from 'react';

import OneUser from '../oneUser/oneUser';

function AllUser() {
    const [allUser, setAllUser] = useState([]);

    const api = async function() {
        try {
            const list = await fetch("https://local-market-grupo-2.herokuapp.com/api/users")
            const apiResult = await list.json()
            console.log(apiResult)
            return apiResult[1]
        } catch (error) {
            throw 'Error en API'
        }
    }

    useEffect(()=>{
         async function fetchData(){
            const ultimoAllUser = await api()
            setAllUser([...allUser,...ultimoAllUser])
         }
         fetchData();
     }, [])

    

    return (
        <div>
          {allUser.map(function(user,index){ 
        return <OneUser key={index} names={user.names} surname={user.surname}/>} 
        )}
        </div>
    )
}

export default AllUser;