import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = userDetails;

  const handleChange = (userDetail) => (event) => {
    setUserDetails({
      ...userDetails,
      error: false, //resets error message at time of new input
      [userDetail]: event.target.value,
    });
  };
  // function handleChange (name){
  //   function (event){
  //     ...
  //   }

  const clickSubmit = (event) => {
    event.preventDefault();
    setUserDetails({ ...userDetails, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setUserDetails({ ...userDetails, error: data.error, success: false });
      } else {
        setUserDetails({
          ...userDetails,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <h3>Create account</h3>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-info col-md-12">
        Sign Up
      </button>
    </form>
  );

  const showErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccessMessage = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      New user account has been created. Click to{" "}
      <Link to="/signin">
        <strong>Sign In</strong>
      </Link>
    </div>
  );

  return (
    <Layout
      title="Signup Page"
      description="Signup with Node React E-commerce App"
      className="container col-md-2 offset-md-5"
    >
      {showSuccessMessage()}
      {showErrorMessage()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
