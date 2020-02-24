import React, { useState } from "react";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import ReactDOM      from "react-dom";
import Navbar        from "./components/Navbar";
import HomePage      from "./pages/HomePage";
import LoginPage     from "./pages/LoginPage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage  from "./pages/InvoicesPage";
import AuthApi       from "./services/authApi";
import AuthContext   from "./contexts/AuthContext";
import PrivateRoute  from "./components/PrivateRoute";
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
            <Route        path="/login"     component={LoginPage}     />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <PrivateRoute path="/invoices"  component={InvoicesPage}  />
            <Route        path="/"          component={HomePage}      />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<App/>, document.querySelector('#app'));
