import './styles.css';
import qs from "qs";
import axios from "axios";
function Navbar(){
    const handleLogout = (evt) => {
        evt.preventDefault();
        localStorage.clear();
        window.location.pathname = "/login";
    }
    return(
        <div>
            <nav id="logo" className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a id="logo" className="navbar-brand" href="#">
                        <img id="logo" src="https://busaracenter.org/wp-content/themes/busara/assets/img/Busara_Logo.svg" alt="" width="80" height="80"
                             />
                    </a>
                    <form className="d-flex">
                            <button onClick={handleLogout} className="btn btn-outline-warning" type="submit">Log Out</button>
                    </form>

                </div>
            </nav>
        </div>
    )
}
export default Navbar;