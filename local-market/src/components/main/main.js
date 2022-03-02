import TotalUsers from '../totalUsers/totalUsers'
// import TotalSellers from '../totalSellers/totalSellers'
// import TotalCustomers from '../totalCustomers/totalCustomers'
import AllUser from '../allUser/allUser'

function Main(){
    return(
        <div className="main-api">
            <div className ="card">
                <TotalUsers/>
                {/* <TotalSellers/>
                <TotalCustomers/> */}
            </div>
            <div className="list-users">
               < AllUser/>
            </div>
        </div>
    )
}

export default Main