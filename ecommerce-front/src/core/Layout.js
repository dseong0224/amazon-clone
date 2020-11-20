import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
//import styles
import "../styles.css";
import layoutStyle from "../layout-style";
//import components
import { getCategories, listSearchResult } from "./apiCore";
import { signout, isAuthenticated } from "../auth";
import { cartTotal } from "./cartHelpers";
import Card from "./Card";
import SearchResults from "./Search";
//import material ui core elements
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//import material ui icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
// import MenuIcon from "@material-ui/icons/Menu";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
  history,
}) => {
  // Search Logic
  const [searchData, setSearchData] = useState({
    categories: [], // brings in all the categories to list them in search drop down
    category: "", // stores the selected category
    search: "",
    results: [], // when search is submitted, all the products are stored in results
    searched: false,
  });
  const { categories, category, search, results, searched } = searchData;

  const loadCategories = () => {
    getCategories().then((categories) => {
      if (categories.error) {
        console.log(categories.error);
      } else {
        setSearchData({ ...searchData, categories: categories });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchDataResult = () => {
    // console.log(search, category);
    if (search) {
      listSearchResult({
        search: search || undefined,
        category: category,
      }).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setSearchData({ ...searchData, results: res, searched: true });
          console.log("hello");
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchDataResult();
  };

  const handleChange = (name) => (event) => {
    setSearchData({
      ...searchData,
      [name]: event.target.value,
      searched: false, // indicates if products have been fetched
    });
  };

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

  const searchForm = () => {
    let currentLocation = window.location.pathname;
    let searchBox = null;
    if (
      currentLocation.includes("admin") ||
      currentLocation.includes("user") ||
      currentLocation.includes("cart") ||
      currentLocation.includes("checkout") ||
      currentLocation.includes("orders")
    ) {
      return searchBox;
    } else {
      return (
        <form onSubmit={searchSubmit}>
          <span className="input-group-text">
            <div className="input-group">
              <div className="input-group-prepend">
                <select
                  className="btn mr-2"
                  onChange={handleChange("category")}
                >
                  <option value="All">All</option>
                  {categories.map((category, i) => (
                    <option key={i} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="search"
                className="form-control"
                onChange={handleChange("search")}
                placeholder="Search by name"
              />
            </div>
            <div className="btn input-group-append no-border">
              <button className="input-group-text">
                <SearchIcon />
              </button>
            </div>
          </span>
        </form>
      );
    }
  };
  //------------------------------------------------------------------------Material UI Render Logic------------------------------------------------------------------------
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  // mobile version
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // mobile version
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // mobile version
    handleMobileMenuClose();
  };

  // mobile version
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isAuthenticated() && ( //and when redirected from sign up page
        <MenuItem onClick={handleMenuClose}>
          <Link
            className="nav-link"
            style={isActive(history, "/signin")}
            to="/signin"
          >
            Sign in
          </Link>
        </MenuItem>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <MenuItem onClick={handleMenuClose}>
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            My account
          </Link>
        </MenuItem>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleMenuClose}>
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            My account
          </Link>
        </MenuItem>
      )}

      {isAuthenticated() && (
        <MenuItem onClick={handleMenuClose}>
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Sign out
          </span>
        </MenuItem>
      )}
    </Menu>
  );

  // mobile version
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={handleProfileMenuOpen}
        className="nav-link"
        style={isActive(history, "/signin")}
        style={isActive(history, "/signup")}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 items in cart" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart Total</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Amazon
            </Link>
          </Typography>
          <div> {searchForm()}</div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                <Badge badgeContent={cartTotal()} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>
          </div>
          {/* mobile version */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* mobile version */}
      {renderMobileMenu}
      {renderMenu}
      <div className="row">
        <SearchResults searched={searched} results={results} />
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const useStyles = makeStyles((theme) => layoutStyle(theme));

export default withRouter(Layout);
