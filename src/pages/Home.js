import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import wish from "../images/wish.svg";
import moment from "moment";
import { getAllproducts } from "../features/products/productSlice";
import { addToWishlist } from "../features/user/userSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getHomeImages } from "../features/home/homeSlice";
import Loader from "../components/Loader";


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
  const homeState = useSelector((state) => state?.home);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHomeImages());
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
     <Loader data={productState ? false : true} />
      {/* <Container class1="home-wrapper-1 py-5"> */}
        <div className="row">
           <Carousel showArrows={false} swipeable={true} showIndicators={false} showThumbs={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={homeState?.homeImages[0]?.url}/>
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
                    { item?.offermsg &&
                      <div className="offers-tag position-absolute">
                        {item?.offermsg}
                    </div>
                    }
                    
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
      <div className="row">
           <Carousel showArrows={false} showIndicators={false} swipeable={true} showThumbs={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={homeState?.homeImages[1]?.url}/>
                </div>
            </Carousel>
        </div>
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
                    { item?.offermsg &&
                      <div className="offers-tag position-absolute">
                        {item?.offermsg}
                    </div>
                    }
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
                    { item?.offermsg &&
                      <div className="offers-tag position-absolute">
                        {item?.offermsg}
                    </div>
                    }
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
                    { item?.offermsg &&
                      <div className="offers-tag position-absolute">
                        {item?.offermsg}
                    </div>
                    }
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
      <div className="row">
           <Carousel showArrows={false} showIndicators={false} swipeable={true} showThumbs={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={homeState?.homeImages[2]?.url}/>
                </div>
            </Carousel>
        </div>
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
                    { item?.offermsg &&
                      <div className="offers-tag position-absolute">
                        {item?.offermsg}
                    </div>
                    }
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
                    { item?.offermsg &&
                      <div className="offers-tag position-absolute">
                        {item?.offermsg}
                    </div>
                    }
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
