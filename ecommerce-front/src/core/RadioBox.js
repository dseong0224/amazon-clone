import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ priceRanges, handleFilters }) => {
  const [price, setPrice] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setPrice(event.target.value);
  };

  return priceRanges.map((priceRange, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${priceRange._id}`}
        name={priceRange}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label"> {priceRange.displayName}</label>
      {console.log("priceRange._id: ", priceRange._id, priceRange, priceRange.displayName)}
    </div>
  ));
};

export default RadioBox;
