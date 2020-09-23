import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices }) => {
  const [price, setPrice] = useState(0);

  const handleChange = () => {};

  return prices.map((price, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${price._id}`}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label"> {price.name}</label>
    </div>
  ));
};

export default RadioBox;
