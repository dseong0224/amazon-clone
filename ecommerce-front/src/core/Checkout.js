import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { getCart, getTotal, emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = () => {
  const [run, setRun] = useState(false);
  const [items, setItems] = useState([]);

  const [data, setData] = useState({
    //states used for braintree api
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      console.log("data: ", data);
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  const showItems = (items) => {
    return (
      <div>
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  useEffect(() => {
    setItems(getCart());
    getToken(userId, token);
  }, [run]);

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && items.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
        </div>
      ) : null}
    </div>
  );

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //   "send nonce and total to process: ",
        //   nonce,
        //   getTotal(items)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(items),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            // console.log("res: ", res)
            const orderData = {
              products: items,
              transaction_id: res.transaction_id,
              amount: res.transaction.amount,
              address: deliveryAddress,
            };
            createOrder(userId, token, orderData)
              .then((res) => {
                emptyCart(() => {
                  setRun(!run);
                  console.log("payment successful and emptied cart");
                  setData({ loading: false, success: true });
                });
              })
              .catch((err) => {
                console.log("err: ", err);
                setData({ loading: false });
              });
          })
          .catch((err) => {
            console.log("err: ", err);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Your order has been placed. Thank you for shopping with us!
    </div>
  );

  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  const showOrderSummary = () => {
    return (
      <div className="col-3">
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showError(data.error)}
        <button onClick={buy} className="btn btn-success btn-block">
          Place your order
        </button>
        <h5 className="mb-4">Order Summary</h5>
        <span>
          Items: $209.99 Shipping & handling: $0.00 Total before tax: $209.99
          Estimated tax to be collected: $16.27 Total: $226.26 Gift Card:-$25.00
          Order total: $201.26
        </span>
        <hr />
      </div>
    );
  };

  const showOrderDetails = () => (
    <div className="col-6">
      {showDropIn()}
      {items.length > 0 ? showItems(items) : noItemsMessage()}
    </div>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row d-flex justify-content-center">
        {showOrderDetails()}
        {showOrderSummary()}
      </div>
    </Layout>
  );
};

export default Checkout;
