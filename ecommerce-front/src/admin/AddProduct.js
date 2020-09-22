import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
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
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();

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
    createdProduct,
    redirectToProfile,
    formData,
  } = productDetails;

  //load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setProductDetails({ ...productDetails, error: data.error });
      } else {
        setProductDetails({
          ...productDetails,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const productDetail =
      name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, productDetail);
    setProductDetails({ ...productDetails, [name]: productDetail });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setProductDetails({ ...productDetails, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setProductDetails({ ...productDetails, error: data.error });
      } else {
        setProductDetails({
          ...productDetails,
          name: "",
          description: "",
          price: "",
          quantity: "",
          photo: "",
          loading: false,
          error: "",
          createdProduct: data.name,
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{createdProduct} has been created</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

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
          {/* maps through the array of categories and renders drop down */}
          <option>--- Select ---</option>
          {categories &&
            categories.map((category, i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Product needs shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          {/* maps through the array of boolean options and renders drop down */}
          <option>--- Select ---</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
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
      description={`Welcome back ${user.name}, ready to add a product to your inventory?`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
