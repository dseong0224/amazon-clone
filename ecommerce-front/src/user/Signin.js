import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin } from "../auth";

const Signin = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = userDetails;

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
    setUserDetails({ ...userDetails, error: false, loading: true });
    signin({ email, password }).then((data) => {
      console.log("data", data);
      if (data.error) {
        setUserDetails({ ...userDetails, error: data.error, loading: false });
      } else {
        setUserDetails({
          ...userDetails,
          redirectToReferrer: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
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
        Sign In
      </button>
    </form>
  );

  const showErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {console.log(error)}
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Signup Page"
      description="Signup with Node React E-commerce App"
      className="container col-md-2 offset-md-5"
    >
      {showLoading()}
      {showErrorMessage()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
