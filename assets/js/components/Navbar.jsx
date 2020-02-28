import React, { useContext } from "react";
import AuthApi               from "../services/authApi";
import { NavLink }           from "react-router-dom";
import AuthContext           from "../contexts/AuthContext";


const Navbar = ({history}) => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    AuthApi.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">SymReact</NavLink>
      <button  className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span  className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">Customers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/invoices">Invoices</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            {!isAuthenticated && <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link btn">Sign Up</NavLink>
              </li>
              <li className="nav-item mx-0">
                  <NavLink to="/login" className="btn btn-success">Login</NavLink>
              </li>
            </> || (
              <li className="nav-item mx-1">
                  <button onClick={handleLogout} className="btn btn-danger">Logout</button>
              </li>
            )}
        </ul>
      </div>
    </nav>
  )
  }

export default Navbar;
