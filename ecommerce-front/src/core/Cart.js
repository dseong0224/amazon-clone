import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import CartItemCard from "./CartItemCard";
import Checkout from "./Checkout"

const Cart = () => {
  const [run, setRun] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {items.length} items.</h2>
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

  return (
    <Layout
      title="Shopping Cart"
      description="Manage itmes in the cart. Add, remove, checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-10 mx-auto">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-2">
          <p>show checkout options/shipping address/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
