import React from "react";
import API from "../config";

const CardImage = ({ product, url }) => (
  <div className="product-img d-flex justify-content-center">
    <img
      src={`${API}/${url}/photo/${product._id}`}
      alt={product.name}
      className="mb-3"
      style={{ maxHeight: "250px", maxWidth: "250px" }}
    />
  </div>
);

export default CardImage;
