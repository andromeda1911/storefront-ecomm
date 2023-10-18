import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { LuLogOut } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaUserSolid } from "react-icons/lia";
import { PiShoppingBagLight } from "react-icons/pi";
import { BsHeart } from "react-icons/bs";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  getAllproductsWithoutFilter,
  getDetails,
} from "../features/products/productSlice";
import { getUserCart } from "../features/user/userSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { all } from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.product);
  const allProducts = useSelector((state) => state?.product?.productsNoFilter);
  const productCategories = useSelector(
    (state) => state?.pCategory?.categories
  );
  const [categoryTags, setcategoryTags] = useState([]);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showSideBar, setShowSideBar] = useState(false);
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
    dispatch(getCategories());
    dispatch(getAllproductsWithoutFilter());
  }, []);

  useEffect(() => {
    let navMenuItems = [];
    for (let index = 0; index < productCategories?.length; index++) {
      const element = productCategories[index];
      let newtags = [];
      allProducts?.map((product) => {
        if (element.title === product.category && product.tags !== undefined) {
          if (!newtags.includes(product.tags)) {
            newtags.push(product.tags);
          }
          let containsElement = navMenuItems.some(
            (obj) => obj["categoryName"] === element.title
          );
          if (!containsElement) {
            navMenuItems.push({
              categoryName: element.title,
              categoryTags: newtags,
            });
          }
        }
      });
    }
    setcategoryTags(navMenuItems);
  }, [allProducts, productCategories]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotal(sum);
      setTotalProducts(cartState.length);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleAccordion = (event, category) => {
    const tagList = document.getElementById("taglist-" + category);
    console.log('e===========', event);
    if (tagList.classList.contains("show-tag")) {
      tagList.classList.remove("show-tag");
      event.target.textContent = '+'
    } else {
      tagList.classList.add("show-tag");
      event.target.textContent = '-'
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      {/* <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free shipping over ₹ 499 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+91 8606684944">
                  +91 (860) 668-4944
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </header> */}

      <header className="header-upper">
        {/* <div className="container-xxl"> */}
        <div className="row align-items-center px-4">
          <div className="col-1 d-none d-md-block">
            <h1>
              <Link to="/">
                <img src="images/logo.png" width={200} height={100} />
              </Link>
            </h1>
          </div>
          <div className="xs-navbar-grid-item col-1 d-sm-none">
            <RxHamburgerMenu onClick={() => setShowSideBar(!showSideBar)} />
          </div>
          <div className="col-5 d-none d-md-block">
            <div className="menu-nav d-flex justify-content-center gap-30">
              {categoryTags &&
                categoryTags?.map((item, index) => {
                  return (
                    <NavLink
                      to={"/store?c=" + item.categoryName}
                      className="top-menu-link"
                      index={index}
                    >
                      {item.categoryName}
                      <div className="category-container hide">
                        <div className="d-flex flex-column">
                          {item &&
                            item.categoryTags?.map((tag, index) => {
                              return (
                                <NavLink to={"/store?q=" + tag}>{tag}</NavLink>
                              );
                            })}
                        </div>
                      </div>
                    </NavLink>
                  );
                })}
            </div>
          </div>
          <div className="col-6 col-sm-3 col-md-3">
            <div className="input-group">
              <Typeahead
                id="pagination-example"
                onChange={(selected) => {
                  navigate(`/product/${selected[0]?.prod}`);
                  dispatch(getDetails(selected[0]?.prod));
                }}
                options={productOpt}
                paginate={paginate}
                labelKey={"name"}
                minLength={2}
                placeholder="Search for products here"
              />
              <span className="input-group-text p-3" id="addon-wrapping">
                <BsSearch className="fs-6" />
              </span>
            </div>
          </div>
          <div className="col-5 col-sm-3 col-md-3">
            <div className="header-upper-links d-flex align-items-center gap-30">
              {/* <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div> */}
              <div>
                <Link
                  to={authState?.user === null ? "/login" : "/my-profile"}
                  className="d-flex align-items-center gap-10 profile-icon-container"
                >
                  {/* <img src="/images/user.svg" alt="user" /> */}
                  <LiaUserSolid className="fs-4" />
                  {authState?.user === null ? (
                    <p className="mb-0">
                      Login <br />
                    </p>
                  ) : (
                    <p className="mb-0">
                      Account
                      {/* {authState?.user?.firstname} */}
                    </p>
                  )}
                  {
                    authState?.user && 
                    <div className="profile-container hide">
                    <div className="d-flex flex-column">
                      <NavLink to="/my-orders">My Orders</NavLink>
                      <NavLink to="/wishlist">Wishlist</NavLink>
                      <NavLink to="/wishlist">Coupons</NavLink>
                      <NavLink to="/contact">Contact Us</NavLink>
                      <NavLink onClick={() => handleLogout()}>Logout</NavLink>
                    </div>
                  </div>
                  }
                  
                </Link>
              </div>
              <div>
                <Link
                  to="/wishlist"
                  className="d-flex align-items-center gap-10 "
                >
                  {/* <img src="/images/wishlist.svg" alt="wishlist" /> */}
                  <BsHeart className="fs-5" />
                  <p className="mb-0">Wishlist</p>
                </Link>
              </div>
              <div>
                <Link to="/cart" className="d-flex align-items-center gap-10">
                  {/* <img src="/images/cart.svg" alt="cart" /> */}
                  <PiShoppingBagLight className="fs-4" />
                  <div className="d-flex flex-column gap-10">
                    <span className="badge bg-white text-dark">
                      {totalProducts ? totalProducts : 0}
                    </span>
                    {/* <p className="mb-0">₹ {total ? total : 0}</p> */}
                  </div>
                </Link>
              </div>
              {/* <div>
                  <Link className="d-flex align-items-center gap-10">
                    <LuLogOut
                      className="text-white fs-3"
                      onClick={() => handleLogout()}
                    />
                  </Link>
                </div> */}
            </div>
          </div>
        </div>
        {showSideBar && (
          <div className="sidebar d-sm-none">
            <p class="sidebar-shop-category-head">
              SHOP BY CATEGORY
              <span
                className="sidebar-close-btn"
                onClick={() => setShowSideBar(false)}
              >
                x
              </span>
            </p>
            {categoryTags &&
              categoryTags?.map((item, index) => {
                return (
                  <ul className="sidebar-list">
                    <li>
                      <NavLink
                        to={"/store?c=" + item.categoryName}
                        className="sidebar-main-category"
                      >
                        {" "}
                        {item.categoryName}
                        <span
                          className="plus-minus float-right"
                          onClick={(e) => handleAccordion(e, item.categoryName)}
                        >
                          +
                        </span>
                      </NavLink>
                      <div
                        id={`taglist-` + item.categoryName}
                        className={`hidden-tag header-panel` + " "}
                      >
                        <ul>
                          <li className="sidebar-category-tags">
                            {item &&
                              item.categoryTags?.map((tag, index) => {
                                return <span>{tag}</span>;
                              })}
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                );
              })}
          </div>
        )}

        {/* </div> */}
      </header>
      {/* <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-15">
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button
                      className="border border-0 bg-transparent text-white"
                      type="button"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}
    </>
  );
};

export default Header;
