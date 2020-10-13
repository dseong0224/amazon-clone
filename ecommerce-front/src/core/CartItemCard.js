import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardImage from "./CardImage";
import showStock from "./showStock";
import { updateItemCount, removeItemFromCart } from "./cartHelpers";

const CartItemCard = ({
  product,
  cartUpdate = false,
  canRemoveItemFromCart = false,
  setRun = (f) => f, //default value of function
  run = undefined, //default value of undefined
}) => {
  const [count, setCount] = useState(product.count);

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      console.log("product: ", product);
      updateItemCount(product._id, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Qty:</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (canRemoveItem) => {
    return (
      canRemoveItem && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-primary ml-2 mb-3"
        >
          Delete
        </button>
      )
    );
  };

  return (
    <div className="container-fluid">
      <div className="">
        <div className="ml-5 mr-5 mb-3">
          <div className="row border-right-0 border-left-0">
            <CardImage
              className="cart-item-image"
              product={product}
              url="product"
            />
            <div className="col cart-item-details">
              <div class="d-flex justify-content-between">
                <div>
                  <Link
                    className="view-product-detail-btn"
                    to={`/product/${product._id}`}
                  >
                    <span
                      className="cart-item cart-item-name"
                      title={product.name}
                    >
                      {product.name.length < 25
                        ? product.name.trim()
                        : product.name.trim().substring(0, 25) + "..."}
                    </span>
                  </Link>
                </div>
                <div>
                  <span className="cart-item ">${product.price}</span>
                </div>
              </div>
              <p>{showStock(product.quantity)}</p>
              <div class="d-flex justify-content-start">
                {showCartUpdateOptions(cartUpdate)}
                {showRemoveButton(canRemoveItemFromCart)}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
