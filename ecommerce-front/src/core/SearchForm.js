import React from "react";
import Menu from "./Menu";
import "../styles.css";
import { useEffect, useState } from "react";
import { getCategories, listSearchResult } from "./apiCore";
import Card from "./Card";
import SearchResults from "./Search";


const [searchData, setSearchData] = useState({
  categories: [], // brings in all the categories to list them in search drop down
  category: "", // stores the selected category
  search: "",
  results: [], // when search is submitted, all the products are stored in results
  searched: false,
});

const { categories, category, search, results, searched } = searchData;

const loadCategories = () => {
  getCategories().then((categories) => {
    if (categories.error) {
      console.log(categories.error);
    } else {
      setSearchData({ ...searchData, categories: categories });
    }
  });
};

useEffect(() => {
  loadCategories();
}, []);

const searchDataResult = () => {
  // console.log(search, category);
  if (search) {
    listSearchResult({
      search: search || undefined,
      category: category,
    }).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setSearchData({ ...searchData, results: res, searched: true });
      }
    });
  }
};

const searchSubmit = (e) => {
  e.preventDefault();
  searchDataResult();
};

const handleChange = (name) => (event) => {
  setSearchData({
    ...searchData,
    [name]: event.target.value,
    searched: false, // indicates if products have been fetched
  });
};

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
