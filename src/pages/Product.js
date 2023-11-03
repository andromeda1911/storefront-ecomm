import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addRating,
  getAllproducts,
  getDetails,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const Product = () => {
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

  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const [popularProduct, setPopularProduct] = useState([]);

  useEffect(() => {
    dispatch(getDetails(getProductId));
    dispatch(getUserCart(config2));
    dispatch(getAllproducts());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index].productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
    }
    setPopularProduct(data);
  }, [productsState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please add comment");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getDetails(getProductId));
      }, 300);
    }
    return false;
  };

  const uploadCart = () => {
    // if (color === null) {
    //   toast.error("Please choose a color");
    //   return false;
    // } else {
    console.log("product to be added", productState);
    if (productState?.size.length !== 0 && size === null) {
      toast.error("Please choose a size");
      return false;
    } 
    else if(productState?.color.length !== 0 && color === null) {
      toast.error("Please choose a color");
      return false;
    }
    else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          size,
          price: productState?.price,
          config2: config2,
        })
      );
    }

    // }
  };

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const setSizeValue = (e, item) => {
    const sizeBadges = document.getElementsByClassName("size-badge");
    console.log("sizebadges", sizeBadges);
    Array.from(sizeBadges).forEach((ele) => {
      if (ele.classList.contains("selected-size")) {
        ele.classList.remove("selected-size");
      } else {
        return;
      }
    });
    setSize(item._id);
    console.log("selectedSize", e);
    e.target.classList.add("selected-size");
    
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  return (
    <>
      <Meta title={"Product Name"}></Meta>
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images?.map((item, index) => {
                return (
                  <div>
                    <img src={item?.url} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <div className="price">₹ {productState?.price}</div>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(Based on 2 reviews)</p>
                </div>
                <a href="#review" className="review-btn">
                  Write a Review
                </a>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>{" "}
                  <p className="product-data">Wrist wwatch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>{" "}
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>{" "}
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>{" "}
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability :</h3>{" "}
                  <p className="product-data">In Stock</p>
                </div>
                {alreadyAdded === false && productState?.size.length !== 0 && (
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Size :</h3>{" "}
                    <div className="d-flex flex-wrap gap-15">
                      {productState?.size.map((item, index) => {
                        return (
                          <span
                            className="size-badge badge border border-1 bg-white text-dark size-border cursor-pointer"
                            onClick={(e) => setSizeValue(e, item)}
                          >
                            {item.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {alreadyAdded === false && productState?.color.length !== 0 && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Color :</h3>{" "}
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Quantity :</h3>{" "}
                      <div className="">
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          max={10}
                          style={{ width: "70px" }}
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={
                    alreadyAdded
                      ? "d-flex gap-10 ms-0"
                      : "ms5 " + "d-flex align-items-center gap-10"
                  }
                >
                  <button
                    className="button border-0"
                    onClick={() => {
                      alreadyAdded ? navigate("/cart") : uploadCart();
                    }}
                  >
                    {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                  </button>
                  <Link to="/signup" className="button signup">
                    Buy Now
                  </Link>
                </div>
                <div className="d-flex align-items-center gap-15 mt-2">
                  {/* <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Add to Compare
                    </a>
                  </div> */}
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" />
                      Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-column gap-10 my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>{" "}
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all Indian domestic orders within{" "}
                    <b>5-10 business days.</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Copy Product Link :</h3>{" "}
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="reviews-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 reviews</p>
                  </div>
                </div>
              </div>
              <div className="review-form py-4">
                <h4 className="mb-2">Write a Review</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={3}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => setStar(e)}
                  />
                </div>
                <div>
                  <textarea
                    type="text"
                    className="form-control w-100"
                    cols="30"
                    rows="7"
                    placeholder="Your Message"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="button border-0"
                    onClick={addRatingToProduct}
                    type="button"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews">
                {productState &&
                  productState?.ratings?.map((item, index) => {
                    return (
                      <div className="review mt-4" key={index}>
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">John Doe</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={true}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3"> {item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default Product;
