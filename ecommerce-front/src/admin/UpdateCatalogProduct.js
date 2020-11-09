import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import {
  getCatalogProduct,
  getCategories,
  updateCatalogProduct,
} from "./apiAdmin";

const UpdateCatalogProduct = ({ match }) => {
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

  const init = (productId) => {
    getCatalogProduct(productId).then((data) => {
      if (data.error) {
        setProductDetails({ ...productDetails, error: data.error });
      } else {
        setProductDetails({
          ...productDetails,
          name: data.name,
          desciption: data.desciption,
          price: data.price,
          category: data.category,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  //load categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setProductDetails({ ...productDetails, error: data.error });
      } else {
        setProductDetails({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
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

    updateCatalogProduct(
      match.params.productId,
      user._id,
      token,
      formData
    ).then((data) => {
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
          redirectToProfile: true,
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
      <h2>{createdProduct} has been updated</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const redirectToHome = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

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
      <button className="btn btn-outline-primary">Update product</button>
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
          {redirectToHome()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCatalogProduct;
