import React from "react";
import { Link } from "react-router-dom";
import CardImage from "./CardImage";
import showStock from "./showStock";

const Card = ({ product }) => {
  return (
    <div className="col-3 mb-3">
      <div className="card border-right-0 border-left-0 border-top-0">
        <div className="card-body">
          <CardImage product={product} url="product" />
          <Link
            className="view-product-detail-btn"
            to={`/product/${product._id}`}
          >
            <h5 title={product.name}>
              {product.name.length < 25
                ? product.name.trim()
                : product.name.trim().substring(0, 25) + "..."}
            </h5>
          </Link>
          <p title={product.description}>
            {product.description.length < 100
              ? product.description.trim()
              : product.description.trim().substring(0, 100) + " ..."}
          </p>
          <p>
            $<strong>{product.price}</strong>
            {showStock(product.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
