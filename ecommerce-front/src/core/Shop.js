import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { priceRanges } from "./fixedPriceRanges";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    //sets my custom filter as empty array for both category and price
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((products) => {
      if (products.error) {
        setError(products.error);
      } else {
        setFilteredProducts(products.data);
        setPageSize(products.pageSize);
        setSkip(0);
      }
    });
  };

  const loadMoreFilteredResults = () => {
    let skipSize = skip + limit;
    getFilteredProducts(skipSize, limit, myFilters.filters).then((products) => {
      if (products.error) {
        setError(products.error);
      } else {
        setFilteredProducts([...filteredProducts, ...products.data]);
        setPageSize(products.pageSize);
        setSkip(skipSize);
      }
    });
  };

  const loadMoreFilteredResultsButton = () => {
    return (
      pageSize > 0 &&
      pageSize >= limit && (
        <button
          onClick={loadMoreFilteredResults}
          className="btn btn-warning mb-5"
        >
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters; //sets my filter to passed in filter values
    if (filterBy == "price") {
      let filteredPriceMinMaxArray = handlePrice(filters); // sets filter with selected price range
      newFilters.filters[filterBy] = filteredPriceMinMaxArray;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters); //customize my filter using this setState method
  };

  const handlePrice = (selectedPriceRangeIndex) => {
    const priceRangesArray = priceRanges;
    let minMaxArray = [];
    for (let priceRange in priceRangesArray) {
      if (
        priceRangesArray[priceRange]._id === parseInt(selectedPriceRangeIndex) // when user selects a price range
      ) {
        minMaxArray = priceRangesArray[priceRange].minMaxArray; // update array of min max range value
      }
    }
    return minMaxArray;
  };

  return (
    <Layout title="Home Page" description="Search" className="container-fluid">
      <div className="row col-10 mx-auto">
        <div className="col-2">
          <h4>Filter by categories</h4>
          <ul>
            {/* all categories are passed in as a prop */}
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price</h4>
          <div>
            {/* all categories are passed in as a prop */}
            <RadioBox
              priceRanges={priceRanges}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-10">
          <h2 className="mb-4">Products</h2>
          <div className="row border-top">
            {filteredProducts.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          <hr />
          {loadMoreFilteredResultsButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
