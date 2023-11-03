import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch2.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addProdToCart, addToWishlist } from "../features/user/userSlice";

const ProductCard = (props) => {
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

  const { grid, data } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const userState = useSelector((state) => state.auth?.user);

  const addToWish = (id) => {
    console.log('userstate', userState);
    if(userState !== null) {
      dispatch(addToWishlist({id:id, config2: config2}));
    } else {
      navigate('/login');
    }
  };

  const uploadCart = (product) => {
      console.log('product', product);
      dispatch(
        addProdToCart({
          productId: product?.productId,
          quantity: 1,
          price: product?.price,
          config2: config2
        })
      );
    // }
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/store" ? `gr-${grid}` : "col-3"
            } `}
          >
            <div className="product-card position-relative">
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
              <div className="product-image">
                <img
                  src={item?.images[0]?.url}
                  className="img-fluid mx-auto cursor-pointer"
                  alt="product image"
                  onClick={() => navigate("/product/"+item?._id)}
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title cursor-pointer" onClick={() => navigate("/product/"+item?._id)}>{item?.title?.substr(0, 35) + "..."}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.totalrating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">₹ {item?.price}</p>
              </div>
              <div className="add-to-cart text-center">
                  <button className="button" onClick={() => uploadCart({productId: item._id, price: item.price})}>Add to Cart</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
