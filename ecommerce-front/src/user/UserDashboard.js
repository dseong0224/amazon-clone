import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPurchaseHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">User Details</h4>
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
        <h4 className="card-header">User Actions</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              Shopping Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update User Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const displayPurchaseHistory = (purchaseHistory) => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Purchase History</h4>
        <ul className="list-group">
          <li className="list-group-item">
            {purchaseHistory.map((purchase, i) => {
              return (
                <div key={i}>
                  <hr />
                  {purchase.products.map((product, j) => {
                    return (
                      <div key={j}>
                        <h6>Product Name: {product.name}</h6>
                        <h6>Product Price: {product.price}</h6>
                        <h6>
                          Product date: {moment(product.createdAt).fromNow()}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
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
          {displayPurchaseHistory(purchaseHistory)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
