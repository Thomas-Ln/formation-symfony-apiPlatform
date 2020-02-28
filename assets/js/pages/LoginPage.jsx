import React, { useState, useContext } from 'react';
import AuthApi     from '../services/authApi.js';
import AuthContext from "../contexts/AuthContext";
import Field       from "../components/forms/Field";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "bob@dylan.com",
    password: "password"
  });

  const [error, setError] = useState("");

  const handleChange = ({currentTarget}) => {
    const value = currentTarget.value;
    const name  = currentTarget.name;
    setCredentials({...credentials, [name]: value});
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await AuthApi.authenticate(credentials);
      setError('');
      setIsAuthenticated(true);
      history.replace("/customers")
    } catch(error) {
      setError("Mail not found or invalid password !");
    }
  };

  return (
    <>
    <h1>Login</h1>

    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        label="Email"
        value={credentials.username}
        onChange={handleChange}
        placeholder="email@something.com"
        type="email"
        error={error}
        focus={true}
      />
      <Field
        name="password"
        label="Password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="password"
        type="password"
        error={error}
      />
      <div className="form-group">
        <button type="submit" className="btn btn-success">
            Login
        </button>
      </div>
    </form>
    </>
  );
  }

export default LoginPage;
