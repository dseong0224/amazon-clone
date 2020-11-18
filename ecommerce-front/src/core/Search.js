import React, { useEffect, useState } from "react";
import { getCategories, listSearchResult } from "./apiCore";
import Card from "./Card";

const SearchResults = (props) => {
  // const [searchData, setSearchData] = useState({
  //   categories: [], // brings in all the categories to list them in search drop down
  //   category: "", // stores the selected category
  //   search: "",
  //   results: [], // when search is submitted, all the products are stored in results
  //   searched: false,
  // });
  const searched = props.searched;
  const results = props.results;

  // const { categories, category, search, results, searched } = searchData;

  // const loadCategories = () => {
  //   getCategories().then((categories) => {
  //     if (categories.error) {
  //       console.log(categories.error);
  //     } else {
  //       setSearchData({ ...searchData, categories: categories });
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadCategories();
  // }, []);

  // const searchDataResult = () => {
  //   // console.log(search, category);
  //   if (search) {
  //     listSearchResult({
  //       search: search || undefined,
  //       category: category,
  //     }).then((res) => {
  //       if (res.error) {
  //         console.log(res.error);
  //       } else {
  //         setSearchData({ ...searchData, results: res, searched: true });
  //       }
  //     });
  //   }
  // };

  // const searchSubmit = (e) => {
  //   e.preventDefault();
  //   searchDataResult();
  // };

  // const handleChange = (name) => (event) => {
  //   setSearchData({
  //     ...searchData,
  //     [name]: event.target.value,
  //     searched: false, // indicates if products have been fetched
  //   });
  // };

  const searchResultMessage = (searched, results) => {
    let searchReultCount = results.length;
    if (searched && searchReultCount > 0) {
      return `Found ${searchReultCount} products`;
    }
    if (searched && searchReultCount <= 0) {
      return `No product found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <p className="mt-4 mb-4">{searchResultMessage(searched, results)}</p>
        <div className="row">
          {results.map((searchedProduct, i) => (
            <Card key={i} product={searchedProduct} />
          ))}
        </div>
      </div>
    );
  };

  // const searchForm = () => (
  //   <form onSubmit={searchSubmit}>
  //     <span className="input-group-text">
  //       <div className="input-group">
  //         <div className="input-group-prepend">
  //           <select className="btn mr-2" onChange={handleChange("category")}>
  //             <option value="All">All</option>
  //             {categories.map((category, i) => (
  //               <option key={i} value={category._id}>
  //                 {category.name}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //         <input
  //           type="search"
  //           className="form-control"
  //           onChange={handleChange("search")}
  //           placeholder="Search by name"
  //         />
  //       </div>
  //       <div className="btn input-group-append no-border">
  //         <button className="input-group-text">Search</button>
  //       </div>
  //     </span>
  //   </form>
  // );

  return (
    <div className="row">
      <div className="container mb-3">{console.log("results: ", results)}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>

  );
};
export default SearchResults;
