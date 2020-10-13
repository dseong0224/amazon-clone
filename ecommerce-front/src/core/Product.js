import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { readSingleProduct, listRelatedProducts } from "./apiCore";
import MiniProductCard from "./MiniProductCard";
import CardImage from "./CardImage";
import showStock from "./showStock";
import { addItem } from "./cartHelpers";
import { Redirect } from "react-router-dom";
import "../styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

const Product = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosOutlinedIcon color="primary" fontSize="large" />,
    nextArrow: <ArrowForwardIosOutlinedIcon color="primary" fontSize="large" />,
  };

  const loadSingleProduct = (productId) => {
    readSingleProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //once product is selected, then fetch related products
        listRelatedProducts(data._id).then((data) => {
          if (data.error) {
            setError(data.err);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <Layout
      title={product.name}
      description={product.description}
      className="container"
    >
      {shouldRedirect(redirect)}
      <div className="row mt-3 mb-5">
        <div className="col-10">
          <div className="row">
            <div className="col-7">
              <CardImage product={product} url="product" />
            </div>
            <div className="col-5">
              <div className="text-center">
                <h3 className="text-dark">
                  {product.name}Bounce Fabric Softener and Dryer Sheets, Outdoor
                  Fresh, 240 Count
                </h3>
                <p className="lead mb-4">⭐️⭐️⭐️⭐️⭐️</p>
                <div className="lead mb-3">
                  ${(product.price / 100).toFixed(2) * 100}
                </div>
                <p>
                  {product.description}One 240 count box only Helps reduce
                  wrinkles. 1 sheet = Small & Medium loads. 2 sheets = Large &
                  HE Full loads. 3 sheets = Extra Large & HE Full loads Controls
                  static cling in fabrics Helps repel lint and hair Softens
                  fabrics Color safe
                </p>
              </div>
            </div>
          </div>
          <hr />
          <h6>Related Products</h6>
          <div className="">
            <Slider {...carouselSettings}>
              {relatedProducts.map((product, i) => (
                <MiniProductCard key={i} product={product} />
              ))}
            </Slider>
          </div>
        </div>
        <div className="col-2">
          <div className="text-center">
            <h4 className="text-dark mb-3">
              ${(product.price / 100).toFixed(2) * 100}
            </h4>
            <p className="mb-3">
              $7.49 FREE One-Day FREE delivery: Tomorrow Order within 4 hrs and
              55 mins Details
            </p>
            {showStock(product.quantity)}
            <button
              onClick={addToCart}
              className="btn btn-outline-info mt-2 mb-2"
            >
              Add to cart
            </button>
            {/* <button className="btn btn-outline-warning mt-2 mb-2">
              Buy Now
            </button> */}
            <hr />
            <button className="btn btn-outline-dark mt-2 mb-2">
              Add to List
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
