import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch2.jpg";
import addcart from "../images/add-cart.svg";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import { getAllproducts } from "../features/products/productSlice";
import { addToWishlist } from "../features/user/userSlice";
import view from "../images/view.svg";
import prodcompare from "../images/prodcompare.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
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

  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  const getProducts = () => {
    dispatch(getAllproducts({sort:null,tag:[],brand:[],category:[],minPrice:null,maxPrice:null}));
  };
  const addToWish = (id) => {
    dispatch(addToWishlist({id:id, config2: config2}));
  };
  return (
    <>
      {/* <Container class1="home-wrapper-1 py-5"> */}
        <div className="row">
          {/* <div className="col-6">
            <div className="main-banner p-3 position-relative">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPhone 15 Pro</h5>
                <p>From ₹7999 or ₹399/mo</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner p-3 position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPhone 15 Pro</h5>
                  <p>
                    From ₹7999 <br /> or ₹399/mo
                  </p>
                </div>
              </div>
              <div className="small-banner p-3 position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy Apple Watch</h5>
                  <p>
                    From ₹12999 <br /> or ₹899/mo
                  </p>
                </div>
              </div>
              <div className="small-banner p-3 position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy Apple Watch</h5>
                  <p>
                    From ₹12999 <br /> or ₹899/mo
                  </p>
                </div>
              </div>
              <div className="small-banner p-3 position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy Apple Watch</h5>
                  <p>
                    From ₹12999 <br /> or ₹899/mo
                  </p>
                </div>
              </div>
            </div>
          </div> */}
           <Carousel showArrows={false} swipeable={true} showThumbs={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src="images/banner1.jpg" />
                </div>
                <div>
                    <img src="images/banner2.jpg" />
                </div>
                <div>
                    <img src="images/banner3.jpg" />
                </div>
            </Carousel>
        </div>
      {/* </Container> */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">FEATURED COLLECTION</h3>
          </div>
        </div>
        <div className="row">
        {productState &&
            productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div
                  key={index}
                  className="col-6 col-md-3 mt-3"
                >
                  <div
                    className="product-card position-relative"
                  >
                    <div className="wishlist-icon position-absolute">
                      <button
                        className="border-0 bg-transparent cursor-pointer"
                        onClick={(e) => {
                          addToWish(item?._id);
                        }}
                      >
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className="product-image text-center">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid mx-auto cursor-pointer"
                        alt="product image"
                        onClick={() => navigate("/product/"+item?._id)}
                      />
                    </div>
                    <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className="product-title cursor-pointer" onClick={() => navigate("/product/"+item?._id)}>{item?.title?.substr(0, 30) + "..."}</h5>
                      {/* <ReactStars
                        count={5}
                        size={24}
                        value={item?.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      /> */}
                      {/* <p className="price">₹ {item?.price}</p> */}
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                      </div>
                    </div>
                  </div>
                </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">TRENDING PRODUCTS</div>
          </div>
          <div className="row">
        {productState &&
            productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <div
                  key={index}
                  className="col-6 col-md-3 mt-3"
                >
                  <div
                    className="product-card position-relative"
                  >
                    <div className="wishlist-icon position-absolute">
                      <button
                        className="border-0 bg-transparent cursor-pointer"
                        onClick={(e) => {
                          addToWish(item?._id);
                        }}
                      >
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className="product-image text-center">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid mx-auto cursor-pointer"
                        alt="product image"
                        onClick={() => navigate("/product/"+item?._id)}
                      />
                    </div>
                    <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className="product-title cursor-pointer" onClick={() => navigate("/product/"+item?._id)}>{item?.title?.substr(0, 30) + "..."}</h5>
                      {/* <ReactStars
                        count={5}
                        size={24}
                        value={item?.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      /> */}
                      {/* <p className="price">₹ {item?.price}</p> */}
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                      </div>
                    </div>
                  </div>
                </div>
                );
              }
            })}
        </div>
          {/* <div className="row">
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "special") {
                  return (
                    <SpecialProduct
                      key={index}
                      id={item?._id}
                      title={item?.title?.substr(0, 70) + "..."}
                      brand={item?.brand}
                      totalrating={item?.totalrating?.toString()}
                      price={item?.price}
                      sold={item?.sold}
                      quantity={item?.quantity}
                    />
                  );
                }
              })}
          </div> */}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">DISCOVER POPULAR PRODUCTS</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div
                  key={index}
                  className="col-6 col-md-3"
                >
                  <div
                  //   to={
                  //     `${
                  //     location.pathname == "/"
                  //       ? "/product/:id"
                  //       : location.pathname == "/product/:id"
                  //       ? "/product/:id"
                  //       : ":id"
                  //   }`
                  // }
                    className="product-card position-relative"
                  >
                    <div className="wishlist-icon position-absolute">
                      <button
                        className="border-0 bg-transparent"
                        onClick={(e) => {
                          addToWish(item?._id);
                        }}
                      >
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className="product-image text-center">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid mx-auto cursor-pointer"
                        alt="product image"
                        onClick={() => navigate("/product/"+item?._id)}
                      />
                    </div>
                    <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className="product-title cursor-pointer" onClick={() => navigate("/product/"+item?._id)}>{item?.title?.substr(0, 70) + "..."}</h5>
                      {/* <ReactStars
                        count={5}
                        size={24}
                        value={item?.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      /> */}
                      {/* <p className="price">₹ {item?.price}</p> */}
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                        {/* <button className="border-0 bg-transparent">
                          <img onClick={() => navigate("/product/"+item?._id)} src={view} alt="view" />
                        </button>
                        <button className="border-0 bg-transparent">
                          <img src={prodcompare} alt="prodcompare" />
                        </button>
                        <button className="border-0 bg-transparent">
                          <img src={addcart} alt="addcart" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">LATEST OFFERS</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "offers") {
                return (
                  <div
                  key={index}
                  className="col-6 col-md-3"
                >
                  <div
                    className="product-card position-relative offer-section"
                  >
                    <div className="wishlist-icon position-absolute">
                      <button
                        className="border-0 bg-transparent"
                        onClick={(e) => {
                          addToWish(item?._id);
                        }}
                      >
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className="product-image text-center">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid mx-auto cursor-pointer"
                        alt="product image"
                        onClick={() => navigate("/product/"+item?._id)}
                      />
                    </div>
                    <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className="product-title cursor-pointer" onClick={() => navigate("/product/"+item?._id)}>{item?.title?.substr(0, 40) + "..."}</h5>
                      {/* <ReactStars
                        count={5}
                        size={24}
                        value={item?.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      /> */}
                      {/* <p className="price"> <strike>₹{item?.price + 199}</strike> ₹{item?.price}</p> */}
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                      </div>
                    </div>
                  </div>
                </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">MEN'S WEAR</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "tshirts") {
                return (
                  <div
                  key={index}
                  className="col-6 col-md-3"
                >
                  <div
                    className="product-card position-relative"
                  >
                    <div className="wishlist-icon position-absolute">
                      <button
                        className="border-0 bg-transparent"
                        onClick={(e) => {
                          addToWish(item?._id);
                        }}
                      >
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className="product-image text-center">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid mx-auto cursor-pointer"
                        alt="product image"
                        onClick={() => navigate("/product/"+item?._id)}
                      />
                    </div>
                    <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className="product-title cursor-pointer" onClick={() => navigate("/product/"+item?._id)}>{item?.title?.substr(0, 40) + "..."}</h5>
                      {/* <ReactStars
                        count={5}
                        size={24}
                        value={item?.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      /> */}
                      {/* <p className="price"> <strike>₹{item?.price + 199}</strike> ₹{item?.price}</p> */}
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                      </div>
                    </div>
                  </div>
                </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">ETHNIC WEAR</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "ethnic") {
                return (
                  <div
                  key={index}
                  className="col-6 col-md-3"
                >
                  <div
                    className="product-card position-relative"
                  >
                    <div className="wishlist-icon position-absolute">
                      <button
                        className="border-0 bg-transparent"
                        onClick={(e) => {
                          addToWish(item?._id);
                        }}
                      >
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className="product-image text-center">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid mx-auto cursor-pointer"
                        alt="product image"
                        onClick={() => navigate("/product/"+item?._id)}
                      />
                    </div>
                    <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className="product-title cursor-pointer" onClick={() => navigate("/product/"+item?._id)}>{item?.title?.substr(0, 30) + "..."}</h5>
                      {/* <ReactStars
                        count={5}
                        size={24}
                        value={item?.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      /> */}
                      {/* <p className="price"> <strike>₹{item?.price + 199}</strike> ₹{item?.price}</p> */}
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                      </div>
                    </div>
                  </div>
                </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex flex-wrap justify-content-between align-items-center">
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Watch</h6>
                  <p>10 items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Watch</h6>
                  <p>10 items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      {/* <Container class1="marquee-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper bg-white p-3">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container> */}
      
      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous_pic2.jpg"
                className="img-fluid"
                alt="famous products"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch</h6>
                <p>From ₹999 or ₹99.99/mo for 14 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous_pic4.jpg"
                className="img-fluid"
                alt="famous products"
              />
              <div className="famous-content position-absolute">
                <h5>Apple Watch 3</h5>
                <h6>Smart Watch</h6>
                <p>From ₹999 or ₹99.99/mo for 14 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous_pic5.webp"
                className="img-fluid"
                alt="famous products"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch</h6>
                <p>From ₹999 or ₹99.99/mo for 14 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous_pic2.jpg"
                className="img-fluid"
                alt="famous products"
              />
              <div className="famous-content position-absolute">
                <h5>Studio Grade</h5>
                <h6>600 nits of brightness.</h6>
                <p>From ₹799 or ₹79.99/mo for 14 mo.*</p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">OUR LATEST BLOGS</h3>
          </div>
        </div>
        <div className="row">
          {blogState &&
            blogState?.map((item, index) => {
              return (
                <div className="col-6 col-md-3 mb-3" key={index}>
                  <BlogCard
                    id={item?._id}
                    title={item?.title}
                    description={item?.description?.substr(0, 20) + "..."}
                    image={item?.images[0]?.url}
                    date={moment(item?.createdAt).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  />
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
