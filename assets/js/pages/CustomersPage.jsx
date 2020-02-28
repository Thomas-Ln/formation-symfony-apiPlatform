import React, { useEffect, useState } from "react";
import Pagination                     from "../components/Pagination";
import CustomersApi                   from "../services/customersApi";
import { Link }                       from "react-router-dom";

const CustomersPage = () => {
  const [customers, setCustomers]     = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch]           = useState("");

  // retrieve customers
  const fetchCustomers = async () => {
    try {
        const data = await CustomersApi.findAll();
        setCustomers(data);
    } catch (error) {
        console.log(error.response);
    }
  };

  //component loading go search customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  //delete customer
  const handleDelete = async id => {
    const originalCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id));
    try {
        await CustomersApi.delete(id)
    } catch(error) {
        setCustomers(originalCustomers);
    }
  };

  //search for a customer
  const handleSearch = ({currentTarget}) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const filteredCustomers = customers.filter(
    c =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase())  ||
      c.email.toLowerCase().includes(search.toLowerCase())     ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  //pagination
  const handleChangePage = (page) => { setCurrentPage(page); }

  const itemsPerPage = 15;

  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  return (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1>Customers List</h1>
      <Link to="/customers/new" className="btn btn-success">Add customer</Link>
    </div>

    <div className="form-group">
      <input
          type="text"
          className="form-control"
          placeholder="Search..."
          onChange={handleSearch}
          value={search}
          autoFocus
      />
    </div>

    <table id="customerList" className="table table-hover table-sm table-striped">
    <thead className="bg-primary text-light">
      <tr>
        <th>Id</th>
        <th>Customer</th>
        <th>Email</th>
        <th>Company</th>
        <th className="text-center ">Invoices</th>
        <th className="text-center">Total Amount</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {paginatedCustomers.map(customer =>
      <tr key={customer.id}>
        <td>{customer.id}</td>
        <td>
          <a href="#"> {customer.firstName} {customer.lastName}</a>
        </td>
        <td>{customer.email}</td>
        <td>{customer.company}</td>
        <td className="text-center align-middle">
          <span className="badge p-2 badge-info text-center">{customer.invoices.length}</span>
        </td>
        <td className="text-center">{customer.totalAmount.toLocaleString()}</td>
        <td>
          <button
              onClick={() => handleDelete(customer.id)}
              disabled={customer.invoices.length > 0}
              className="btn btn-danger btn-sm"
          >
              Delete
          </button>
        </td>
      </tr>
      )}
    </tbody>
    </table>

    {itemsPerPage < filteredCustomers.length && (
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={filteredCustomers.length}
        onPageChanged={handleChangePage}
      />
    )}
  </>
  )
}

export default CustomersPage;
