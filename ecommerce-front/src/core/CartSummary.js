// import React, { useEffect, useState } from "react";
// import Layout from "./Layout";
// import { getProducts, getBraintreeClientToken } from "./apiCore";
// import Card from "./Card";
// import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";

// const CartSummary = ({ products }) => {
//   const [data, setData] = useState({
//     //states used for braintree api
//     success: false,
//     clientToken: null,
//     error: "",
//     instance: {},
//     address: "",
//   });

//   const userId = isAuthenticated() && isAuthenticated().user._id;
//   const token = isAuthenticated() && isAuthenticated().token;

//   const getToken = (userId, token) => {
//     getBraintreeClientToken(userId, token).then((data) => {
//       if (data.error) {
//         setData({ ...data, error: data.error });
//       } else {
//         setData({ ...data, clientToken: data.clientToken });
//       }
//     });
//   };

//   useEffect(() => {
//     getToken(userId, token);
//   }, []);

//   const getTotal = () => {
//     return products.reduce((currentValue, nextValue) => {
//       return currentValue + nextValue.count * nextValue.price;
//     }, 0);
//   };

//   const showCartSummary = () => {
//     return isAuthenticated() ? (
//       <div>{showDropIn()}</div>
//     ) : (
//       <Link to="/signin">
//         <button className="btn btn-primary">Sign-In/Up for checkout</button>
//       </Link>
//     );
//   };
//   const showDropIn = () => (
//     <div>
//       {data.clientToken !== null && products.length > 0 ? (
//         <Link to="/checkout">
//           <button className="btn btn-success block">Proceed to checkout</button>
//         </Link>
//       ) :
//       <div>
//         <DropIn
//           options={{ authorization: data.clientToken }}
//           onInstance={(instance) => (data.instance = instance)}
//         />
//         <button className="btn btn-success">Place Order</button>
//       </div>
//       null}
//     </div>
//   );

//   return (
//     <div>
//       <h2>Total: ${getTotal()}</h2>
//       {showCartSummary()}
//     </div>
//   );
// };

// export default CartSummary;
