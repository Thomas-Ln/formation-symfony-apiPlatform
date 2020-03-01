import React, { useState } from 'react';
import Field               from '../components/forms/Field';
import axios               from 'axios';
import { toast }           from 'react-toastify';
import { USERS_API }       from '../config';

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  //form state
  const handleChange = ({currentTarget}) => {
    const { name, value } = currentTarget;
    setUser({...user, [name]: value});
  };

  //form validation
  const handleSubmit = async event => {
    event.preventDefault();
    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Passwords don't match !";
      setErrors(apiErrors);
      return;
    }

    try {
      const response = await axios.post(USERS_API, user);
      toast.success("Registration validated !");
      history.replace("/login");
      setErrors({});
    } catch(error) {
      const { violations } = error.response.data;
      if(violations) {
        violations.forEach( violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Registration failed !");
    }
  };

  return (
    <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        label="Firstname"
        placeholder="Firstname"
        error={errors.firstName}
        value={user.firstName}
        onChange={handleChange}
      />
      <Field
        name="lastName"
        label="Lastname"
        placeholder="Lastname"
        error={errors.lastName}
        value={user.lastName}
        onChange={handleChange}
      />
      <Field
        name="email"
        label="Email"
        placeholder="Email"
        error={errors.email}
        value={user.email}
        onChange={handleChange}
      />
      <Field
        name="password"
        label="Password"
        placeholder="Password"
        error={errors.password}
        value={user.password}
        onChange={handleChange}
        type="password"
      />
      <Field
        name="passwordConfirm"
        label="Password Confirmation"
        placeholder="Confirm password"
        error={errors.passwordConfirm}
        value={user.passwordConfirm}
        onChange={handleChange}
        type="password"
      />

      <div className="form-group">
        <button type="submit" className="btn btn-success">
            Sign Up
        </button>
      </div>
    </form>
    </>
  );
}

export default RegisterPage;
