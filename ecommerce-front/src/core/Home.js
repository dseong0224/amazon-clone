import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
// import Search from "./Search";

const Home = () => {
  const [productsByPopularity, setProductsByPopularity] = useState([]);
  const [productsByRecent, setProductsByRecent] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsByPopularity = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByPopularity(data);
      }
    });
  };

  const loadProductsByRecent = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByRecent(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByPopularity();
    loadProductsByRecent();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByRecent.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsByPopularity.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
