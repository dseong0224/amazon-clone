import React, { useState, useEffect } from "react";

const Checkbox = ({ categories }) => {
  //define state of checked categories as an array
  const [checkedCategories, setcheckedCategories] = useState([]);

  const handleToggle = (category) => () => {
    //return the first index or -1
    const currentCategoryId = checkedCategories.indexOf(category);
    const updatedCheckedCategories = [...checkedCategories];
    //if currently checkedCategories was not already in checkedCategories state > push
    //else pull/take off
    if (currentCategoryId === -1) {
      updatedCheckedCategories.push(category);
    } else {
      updatedCheckedCategories.splice(currentCategoryId, 1);
    }
    console.log(updatedCheckedCategories);
    setcheckedCategories(updatedCheckedCategories);
  };

  return categories.map((category, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(category._id)}
        value={checkedCategories.indexOf(category._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label"> {category.name}</label>
    </li>
  ));
};

export default Checkbox;
