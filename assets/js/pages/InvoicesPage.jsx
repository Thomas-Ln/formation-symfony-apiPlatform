import React, { useEffect, useState } from "react";
import Pagination                     from "../components/Pagination";
import InvoicesApi                    from "../services/invoicesApi";
import moment                         from "moment";
import { Link }                       from "react-router-dom";
import { toast }                      from 'react-toastify';

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "info",
  CANCELLED: "danger"
};

const STATUS_LABELS = {
  PAID: 'Paid',
  SENT: 'Sent',
  CANCELLED: 'Cancelled'
};

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // retrieve invoices
  const fetchInvoices = async () => {
    try {
      const data = await InvoicesApi.findAll();
      setInvoices(data);
    } catch (error) {
        toast.error('Error during invoices fetching !');
    }
  };

  //component loading go search invoices
  useEffect(() => {
    fetchInvoices();
  }, []);

  //date format
  const formatDate = (str) => moment(str).format('DD/MM/YYYY');

//th Delete btn
//disabled={invoices.length > 0}
  //delete invoice
  const handleDelete = async id => {
    const originalInvoices = [...invoices];
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    try {
      await InvoicesApi.delete(id);
      toast.success('Invoice deleted !');
    } catch (error) {
      setInvoices(originalInvoices);
      toast.error('Error');
    }
  };

  //search for an invoice
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const filteredInvoices = invoices.filter(
    i =>
      i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      i.amount.toString().startsWith(search.toLowerCase()) ||
      STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

  //pagination
  const handleChangePage = (page) => { setCurrentPage(page); }

  const itemsPerPage = 15;

  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
    );

  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1>Invoices List</h1>
      <Link to="/invoices/new" className="btn btn-success">Add invoice</Link>
    </div>

    <div className="form-group" >
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      onChange={handleSearch}
      value={search}
      autoFocus
    />
    </div>

    <table
      id="invoiceList"
      className="table table-hover table-sm table-striped">

    <thead className="bg-primary text-light">
      <tr>
        <th>Id</th>
        <th>Customer</th>
        <th className="text-center">Sent at</th>
        <th className="text-center">Status</th>
        <th className="text-center">Total Amount</th>
        <th></th>
      </tr>
    </thead>

    <tbody>{paginatedInvoices.map(invoice =>
      <tr key={invoice.id}>
      <td>
        {invoice.chrono}
      </td>
      <td>
      {invoice.customer.firstName} {invoice.customer.lastName}
      </td>
      <td className="text-center">
        {formatDate(invoice.sentAt)}
      </td>
      <td className="text-center">
      <span className={"badge p-2 badge-" + STATUS_CLASSES[invoice.status]}>
        {STATUS_LABELS[invoice.status]}
      </span>
      </td>
      <td className="text-center">
        {invoice.amount.toLocaleString()}
      </td>
      <td>
      <Link
        to={"/invoices/" + invoice.id}
        className="btn btn-info btn-sm mr-2"
      >
        Edit
      </Link>
      <button
        onClick={() => handleDelete(invoice.id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
      </td>
      </tr>
      )
  }
  </tbody>
  </table>

  {itemsPerPage < filteredInvoices.length && (
    <Pagination
    currentPage={currentPage}
    itemsPerPage={itemsPerPage}
    length={filteredInvoices.length}
    onPageChanged={handleChangePage}
    />
    )}
  </>
  )
}

export default InvoicesPage;
