import { useState, useEffect } from 'react';

function TotalUsers() {
    const [total, setTotal] = useState([]);

    const api = async function() {
        try {
            const list = await fetch("https://local-market-grupo-2.herokuapp.com/api/users")
            const apiResult = await list.json()
            console.log(apiResult)
            return apiResult[0]
        } catch (error) {
            throw 'Error en API'
        }
    }

    useEffect(()=>{
         async function fetchData(){
            const ultimoTotal = await api()
            setTotal(ultimoTotal)
         }
         fetchData();
     }, [])

    return (
        <div>
            <div className='card'>
                <div className='titulos'>
                    <h3>
                        Total de usuarios registrados
                    </h3>
                    <h4> {total.count} </h4>
                </div>
            </div>
        </div>
    )
}

export default TotalUsers;