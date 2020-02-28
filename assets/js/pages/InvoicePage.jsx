import React, { useState, useEffect } from 'react';
import Field                          from '../components/forms/Field';
import Select                         from '../components/forms/Select';
import CustomersApi                   from '../services/customersApi';
import InvoicesApi                    from '../services/invoicesApi';
import axios                          from 'axios';

const InvoicePage = ({history, match}) => {
  const { id = "new" } = match.params;

  const [invoice, setInvoice] = useState({
    amount:   "",
    customer: "",
    status:   "SENT"
  });

  const [errors, setErrors] = useState({
    amount:   "",
    customer: "",
    status:   ""
  });

  const [ customers, setCustomers ] = useState([]);

  const [editing, setEditing] = useState(false);

  //fetch customers
  const fetchCustomers = async () => {
    try {
      const data = await CustomersApi.findAll();
      setCustomers(data);
      if(!invoice.customer) {
        setInvoice({...invoice, customer: data[0].id});
      }
    } catch(error) {
      history.replace("/customers");
    }
  };

  //fetch invoices
  const fetchInvoice = async id => {
    try {
      const { amount, status, customer } = await InvoicesApi.find(id);
      setInvoice({ amount, status, customer: customer.id });
    } catch (error) {
      history.replace("/invoices");
    }
  };

  //load customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  //
  useEffect(() => {
    if(id !== "new" ) {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  //form change state (fields values)
  const handleChange = ({currentTarget}) => {
    const { name, value } = currentTarget;
    setInvoice({...invoice, [name]: value});
  };

  //form validation
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (editing) {
        await InvoicesApi.update(id, invoice);
      } else {
        await InvoicesApi.add(invoice);
      }
      history.replace("/invoices");
    } catch({ response }) {
      const { violations } = response.data;
      if(violations) {
        const apiErrors = {};
        violations.forEach( violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
    }
  };

  return (
    <>
    {editing && <h1>Edit Invoice</h1> || <h1>Add Invoice</h1>}
      <form onSubmit={handleSubmit}>
        <Field
          name="amount"
          label="Amount"
          placeholder="Invoice amount"
          value={invoice.amount}
          onChange={handleChange}
          error={errors.amount}
          type="number"
        />

        <Select
          name="customer"
          label="Customer"
          value={invoice.customer}
          onChange={handleChange}
          error={errors.customer}
        >
          {customers.map(customer => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.firstName} {customer.lastName }
            </option>
          ))}
        </Select>

        <Select
          name="status"
          label="Status"
          value={invoice.status}
          onChange={handleChange}
          error={errors.status}
        >
          <option value="SENT">Sent</option>
          <option value="PAID">Paid</option>
          <option value="CANCELLED">Cancelled</option>
        </Select>

        <div className="form-group">
          <button type="submit" className="btn btn-success">Add</button>
        </div>
      </form>
    </>
  );
}

export default InvoicePage;
