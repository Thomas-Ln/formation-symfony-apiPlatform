import React, { useState, useContext } from 'react';
import AuthApi     from '../services/authApi.js';
import AuthContext from "../contexts/AuthContext";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
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
  }

  return (
    <>
    <h1>Login</h1>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Email</label>
        <input
         name="username"
         value={credentials.username}
         onChange={handleChange}
         id="username"
         type="email"
         className={"form-control" + (error && " is-invalid")}
         placeholder="email@something.com"
         autoFocus
        />
        {error && <p className="invalid-feedback">{error}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
         name="password"
         value={credentials.password}
         onChange={handleChange}
         id="password"
         type="password"
         className={"form-control" + (error && " is-invalid")}
         placeholder="password"
        />
        {error && <p className="invalid-feedback">{error}</p>}
      </div>
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
