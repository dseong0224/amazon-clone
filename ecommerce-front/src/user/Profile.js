import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import {
  readUserProfile,
  updateUserProfile,
  updateLocalUserProfile,
} from "./apiUser";

const Profile = ({ match }) => {
  const [profileValues, setProfileValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { token } = isAuthenticated();

  const { name, email, password, error, success } = profileValues;

  const init = (userId) => {
    readUserProfile(userId, token).then((data) => {
      if (data.error) {
        setProfileValues({ ...profileValues, error: true });
      } else {
        setProfileValues({
          ...profileValues,
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);
  const handleChange = (name) => (e) => {
    setProfileValues({
      ...profileValues,
      error: false,
      [name]: e.target.value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(match.params.userId, token, {
      name,
      email,
      password,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateLocalUserProfile(data, () => {
          setProfileValues({
            ...profileValues,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const updateProfileVals = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="edit profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Edit Profile</h2>
      {updateProfileVals(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
