import React         from 'react';
import ReactDOM      from 'react-dom';
import Navbar        from "./components/Navbar";
import HomePage      from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage  from "./pages/InvoicesPage";
import { HashRouter, Switch, Route } from "react-router-dom";
import '../css/app.css';

const App = () => {
  return (
    <HashRouter>
      <Navbar/>

      <main className="container pt-5">
        <Switch>
          <Route path="/customers" component={CustomersPage} />
          <Route path="/invoices" component={InvoicesPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
}

ReactDOM.render(<App/>, document.querySelector('#app'));