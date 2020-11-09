import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCatalogProducts, deleteCatalogProduct } from "./apiAdmin";
import { useEffect } from "react";

const ManageCatalog = () => {
  const [productsFromCatalog, setProductsFromCatalog] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getCatalogProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProductsFromCatalog(data);
      }
    });
  };

  const deleteProductFromCatalog = (productId) => {
    deleteCatalogProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUd on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {productsFromCatalog.map((product, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{product.name}</strong>
                <Link to={`/admin/product/update/${product._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => deleteProductFromCatalog(product._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCatalog;
