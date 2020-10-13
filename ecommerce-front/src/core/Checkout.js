import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Checkout = ({ products }) => {
  return <div>{JSON.stringify(products)}</div>;
};

export default Checkout;
