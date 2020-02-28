import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  type  = "text",
  error = "",
  focus
  }) => (
    <div className="form-group">
      <label htmlFor="username">{label}</label>
      <input
        id={name}
        name={name}
        className={"form-control" + (error && " is-invalid")}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={focus}
      />
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );

export default Field;
