import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userInfo = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              Shopping Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/profile/update">
              Update User Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Order history</h4>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Welcome back ${name} !`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
