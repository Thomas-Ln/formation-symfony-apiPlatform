import React, { useState, useEffect } from 'react';
import Field                          from '../components/forms/Field';
import { Link }                       from 'react-router-dom';
import CustomersApi                   from '../services/customersApi';
import { toast }                      from 'react-toastify';

const CustomerPage = ({ history, match }) => {
  const { id = "new" } = match.params;
  const [editing, setEditing] = useState(false);

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: ""
  });

  //fetch customer by id
  const fetchCustomer = async id => {
    try {
      const { firstName, lastName, email, company } = await CustomersApi.find(id);
      setCustomer({ firstName, lastName, email, company });
    } catch(error) {
      history.replace("/customers");
      toast.error('Customer not found !');
    }
  };

  //load customer props in fields when editing customer
  useEffect(() => {
    if(id !== "new") {
      setEditing(true);
      fetchCustomer(id);
    }
  }, [id]);

  //form change state (fields values)
  const handleChange = ({currentTarget}) => {
    const { name, value } = currentTarget;
    setCustomer({...customer, [name]: value});
  };

  //form validation
  const handleSubmit = async event => {
    event.preventDefault();
    try {
     setErrors({});
      //edit
      if(editing) {
        await CustomersApi.update(id, customer);
        toast.success('Customer updated!');
      } else {
      //add
        await CustomersApi.add(customer);
        toast.success('Customer created!');
        history.replace("/customers");
      }
    } catch({ response }) {
      const { violations } = response.data;
      if(violations) {
        const apiErrors = {};
        violations.forEach( violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        toast.error('Error form not submitted !');
      }
    }
  };

  return (
    <>
    {
      (!editing && <h1>Add customer</h1>)
      ||
      (<h1>Update customer</h1>)
    }

    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        label="Firstname"
        placeholder="Firstname"
        value={customer.firstName}
        onChange={handleChange}
        error={errors.firstName}
        focus={true}
      />
      <Field
        name="lastName"
        label="Lastname"
        placeholder="Lastname"
        value={customer.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Field
        name="email"
        label="Email"
        placeholder="email@example.com"
        value={customer.email}
        onChange={handleChange}
        error={errors.email}
        type="email"
      />
      <Field
        name="company"
        label="Company"
        placeholder="Company"
        value={customer.company}
        onChange={handleChange}
        error={errors.company}
      />

      <div className="form-group text-center">
        <button type="submit" className="btn btn-success w-25 mt-2">
          Add
        </button>
      </div>
    </form>
    </>
  );
}

export default CustomerPage;
