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
import { getDetails } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const Product = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.singleproduct);
  const cartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getDetails(getProductId));
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index].productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState]);

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please choose a color");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
    }
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

  const [orderedProduct, setorderedProduct] = useState(true);
  return (
    <>
      <Meta title={"Product Name"}></Meta>
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
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
          <div className="col-6">
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
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>{" "}
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      L
                    </span>
                  </div>
                </div>
                {alreadyAdded === false && (
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
                  <div
                    className={
                      alreadyAdded
                        ? "ms-0"
                        : "ms5" + "d-flex align-items-center gap-30 ms-5"
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
                      Buy It Now
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Add to Compare
                    </a>
                  </div>
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
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4 className="mb-2">Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      type="text"
                      className="form-control w-100"
                      cols="30"
                      rows="7"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews">
                <div className="review mt-4">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">John Doe</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat
                  </p>
                </div>
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
    </>
  );
};

export default Product;
