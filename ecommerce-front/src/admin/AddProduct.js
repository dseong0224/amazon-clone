import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createProduct,
    redirectToProfile,
    formData,
  } = productDetails;

  useEffect(() => {
    setProductDetails({ ...productDetails, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const productDetail =
      name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, productDetail);
    setProductDetails({ ...productDetails, [name]: productDetail });
  };

  const clickSubmit = (event) => {};

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Product Details</h4>
      <label className="text-muted">Upload image</label>
      <div className="form-group">
        <label className="btn btn-secondary">
          {" "}
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <input
          onChange={handleChange("description")}
          type="text"
          className="form-control"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          onChange={handleChange("category")}
          type="text"
          className="form-control"
        >
          <option value="5f66a726f63bb40818dd26ef"></option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Product needs shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <button className="btn btn-outline-primary">Create new product</button>
    </form>
  );
  return (
    <Layout
      title="Add a new product"
      description={`Welcome back ${user.name}, ready to add a new category?`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
