import React from "react";
import API from "../config";

const MiniProductCardImage = ({ product, url }) => (
  <div className="mini-product-img d-flex justify-content-center">
    <img
      src={`${API}/${url}/photo/${product._id}`}
      alt={product.name}
      className="mb-2"
      style={{ maxHeight: "150px", maxWidth: "150px" }}
    />
  </div>
);

export default MiniProductCardImage;
