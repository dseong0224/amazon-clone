import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    //sets my custom filter as empty array for both category and price
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  });

  const handleFilters = (filters, filterBy) => {
    // console.log("shop: ", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters; //sets my filter to passed in filter values
    setMyFilters(newFilters); //customize my filter using this setState method
  };

  return (
    <Layout title="Home Page" description="Search" className="container-fluid">
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            {/* all categories are passed in as a prop */}
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by preice range</h4>
          <div>
            {/* all categories are passed in as a prop */}
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
