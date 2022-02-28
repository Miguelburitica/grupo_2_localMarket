// import '../../assets/css/header.css'
import logo from '../../assets/images/logolocalmarket.png'

function Header() {
return (
    <header className="main-header">	
	<div className="content">
            <div className="logo">
            <img src={logo} alt="Logo LocalMarket" />     
            </div>
                <h2>Local Market Dashboard</h2>
	</div>
    </header>
)
}

export default Header;