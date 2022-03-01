import TotalUsers from '../totalUsers/totalUsers'
// import TotalSellers from '../totalSellers/totalSellers'
// import TotalCustomers from '../totalCustomers/totalCustomers'
// import AllUsers from '../allUsers/allUsers'

function Main(){
    return(
        <div className="main-api">
            <div className ="card">
                <TotalUsers/>
                {/* <TotalSellers/>
                <TotalCustomers/> */}
            </div>
            <div className="list-users">
               {/* < AllUsers/> */}
            </div>
        </div>
    )
}

export default Main