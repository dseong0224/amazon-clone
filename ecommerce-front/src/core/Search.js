import React, { useEffect, useState } from "react";
import { getCategories } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [searchData, setSearchData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = searchData;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSearchData({ ...searchData, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchSubmit = () => {};
  const handleChange = () => {};

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append no-border">
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div>
      <div className="container mt-1 mb-1">{searchForm()}</div>
      {/* <h2>Search Bar {JSON.stringify(categories)}</h2> */}
    </div>
  );
};
export default Search;
