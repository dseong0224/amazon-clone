import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import CartItemCard from "./CartItemCard";
import { isAuthenticated } from "../auth";

const Cart = () => {
  const [run, setRun] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <hr />
        {items.map((product, i) => (
          <CartItemCard
            key={i}
            product={product}
            cartUpdate={true}
            canRemoveItemFromCart={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const proceedToCheckout = () => {
    return isAuthenticated() ? (
      <Link to="/checkout" products={items}>
        <button className="btn btn-primary">Proceed to checkout</button>
      </Link>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign-In to proceed</button>
      </Link>
    );
  };

  return (
    <Layout
      title="Shopping Cart"
      description="Manage itmes in the cart. Add, remove, checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8 mx-auto">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-3">
          <h3 className="mt-4 mb-2">Subtotal ({items.length} itmes):</h3>
          <h2 className="mb-4"><strong>${getTotal(items)}</strong></h2>
          {proceedToCheckout()}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
