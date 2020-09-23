import React from "react";
import { Link } from "react-router-dom";
import CardImage from "./CardImage";

const Card = ({ product }) => {
  return (
    <div className="col-3 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <CardImage product={product} url="product" />
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-secondary mt-2 mb-2 mr-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-info mt-2 mb-2">
            Add product to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
