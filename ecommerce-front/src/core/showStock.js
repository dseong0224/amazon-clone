import React from "react";

const showStock = (quantity) => {
  return quantity > 0 ? (
    <span className="badge badge-light badge-pill text-success">In Stock.</span>
  ) : (
    <span className="badge badge-light badge-pill text-danger">
      Out of Stock.
    </span>
  );
};

export default showStock;
