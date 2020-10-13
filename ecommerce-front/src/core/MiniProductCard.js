import React from "react";
import { Link } from "react-router-dom";
import CardImage from "./CardImage";
import MiniProductCardImage from "./MiniProductCardImage";
import showStock from "./showStock";

const MiniProductCard = ({ product }) => {
  return (
    <div className="col-12 mb-3">
      <div className="card border-right-0 border-left-0 border-top-0">
        <div className="card-body">
          <MiniProductCardImage product={product} url="product" />
          <Link
            className="view-product-detail-btn"
            to={`/product/${product._id}`}
          >
            <p title={product.name}>
              {product.name.length < 15
                ? product.name.trim()
                : product.name.trim().substring(0, 15) + "..."}
            </p>
          </Link>
          <p title={product.rating}>⭐️⭐️⭐️⭐️⭐️</p>
          <p>
            $<strong>{product.price}</strong>
            {showStock(product.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniProductCard;
