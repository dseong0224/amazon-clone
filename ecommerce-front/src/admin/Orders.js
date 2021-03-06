import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {
  listOrders,
  getOrderStatusOptions,
  updateOrderStatus,
} from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatusOptions, setOrderStatusOptions] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadOrderStatusOptions = () => {
    getOrderStatusOptions(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrderStatusOptions(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadOrderStatusOptions();
  }, []);

  const noOrders = (orders) => {
    return orders.length < 1 ? <h4>No orders</h4> : null;
  };

  const showProductDetail = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleOrderStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showOrderStatus = (order) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {order.status}</h3>
      <select
        name="orderStatus"
        className="form-control"
        onChange={(e) => handleOrderStatusChange(e, order._id)}
      >
        <option>Update Status</option>
        {orderStatusOptions.map((orderStatusOption, index) => (
          <option key={index} value={orderStatusOption}>
            {orderStatusOption}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`Welcome back ${user.name}, you can manage all the orders`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {noOrders(orders)}
          {orders.map((order, orderIndex) => {
            return (
              <div
                className="mt-5"
                key={orderIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span>Order#: {order._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showOrderStatus(order)}</li>
                  <li className="list-group-item">
                    {console.log("order.transaction_id: ", order)}
                    Transaction ID: {order._id}
                  </li>
                  <li className="list-group-item">Amount: ${order.amount}</li>
                  <li className="list-group-item">
                    Ordered by: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered on: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {order.address}
                  </li>
                </ul>

                <h5 className="mt-4 mb-4 font-italic">
                  Total ordered items: {order.products.length}
                </h5>
                {order.products.map((product, productIndex) => {
                  return (
                    <div
                      className="mb-4"
                      key={productIndex}
                      style={{ padding: "20px", border: "1px solid indigo" }}
                    >
                      {showProductDetail("Product Name", product.name)}
                      {showProductDetail("Product Price", product.price)}
                      {showProductDetail("Product Total", product.count)}
                      {showProductDetail("Product Id", product._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
