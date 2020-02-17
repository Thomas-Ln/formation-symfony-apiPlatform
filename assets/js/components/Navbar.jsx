import React from 'react'

const Navbar = (props) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">SymReact</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#/customers">Customers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/invoices">Invoices</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#" className="nav-link btn">Sign Up</a>
              </li>
              <li className="nav-item mx-0">
                  <a href="#" className="btn btn-success">Login</a>
              </li>
              <li className="nav-item mx-1">
                  <a href="#" className="btn btn-danger">Logout</a>
              </li>
          </ul>
        </div>
      </nav>
    )
  }

export default Navbar;
