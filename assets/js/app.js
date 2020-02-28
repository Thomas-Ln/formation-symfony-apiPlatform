import React, { useState }                       from "react";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import ReactDOM                                  from "react-dom";
import Navbar                                    from "./components/Navbar";
import HomePage                                  from "./pages/HomePage";
import LoginPage                                 from "./pages/LoginPage";
import RegisterPage                              from "./pages/RegisterPage";
import CustomerPage                              from "./pages/CustomerPage";
import CustomersPage                             from "./pages/CustomersPage";
import InvoicePage                               from "./pages/InvoicePage";
import InvoicesPage                              from "./pages/InvoicesPage";
import AuthApi                                   from "./services/authApi";
import AuthContext                               from "./contexts/AuthContext";
import PrivateRoute                              from "./components/PrivateRoute";
import { ToastContainer }                        from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/app.css';

AuthApi.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <HashRouter>
        <NavbarWithRouter />
        <main className="container pt-5">
          <Switch>
            <Route        path="/login"         component={LoginPage}     />
            <Route        path="/register"      component={RegisterPage}  />
            <PrivateRoute path="/customers/:id" component={CustomerPage}  />
            <PrivateRoute path="/customers"     component={CustomersPage} />
            <PrivateRoute path="/invoices/:id"  component={InvoicePage}   />
            <PrivateRoute path="/invoices"      component={InvoicesPage}  />
            <Route        path="/"              component={HomePage}      />
          </Switch>
        </main>
      </HashRouter>
      <ToastContainer position="bottom-right"/>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<App/>, document.querySelector('#app'));
