import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute"; //takes props and component and redirect to page only when logged in
import AdminRoute from "./auth/AdminRoute";
/*can reuse this component for any page with logged in use access only*/
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import Profile from "./user/Profile";

import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";
import ManageCatalog from "./admin/ManageCatalog";
import UpdateCatalogProduct from "./admin/UpdateCatalogProduct";

import Home from "./core/Home";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Checkout from "./core/Checkout";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/catalog" exact component={ManageCatalog} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateCatalogProduct}
        />

        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/checkout" exact component={Checkout} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
