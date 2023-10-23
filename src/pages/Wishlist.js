import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getUserProductWishlist } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
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
  const navigate = useNavigate();
  useEffect(() => {
    getWishlistItems();
  }, []);
  const getWishlistItems = () => {
    dispatch(getUserProductWishlist(config2));
  };
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist({id:id, config2: config2}));
    setTimeout(() => {
      dispatch(getUserProductWishlist(config2));
    }, 300);
  };
  const wishlistState = useSelector((state) => state.auth);
  const { isSuccess, user } = wishlistState;
  useEffect(() => {
    if (isSuccess) {
      console.log(user);
    }
  }, [isSuccess, user]);
  return (
    <>
      <Meta title={"Wishlist"}></Meta>
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row text-center">
          {wishlistState?.user?.wishlist?.length === 0 && <div className="fs-3">Your wishlist is empty!</div> }
          {wishlistState?.user?.wishlist?.map((item, index) => {
            return (
              <div className="col-6 col-md-3" key={index}>
                <div
                  className="wishlist-card bg-white position-relative
              "
                >
                  <img
                    onClick={() => {
                      removeFromWishlist(item?._id);
                    }}
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image">
                    <img
                      src={
                        item?.images[0]?.url
                          ? item?.images[0]?.url
                          : "images/watch.jpg"
                      }
                      className="img-fluid w-100 mx-auto"
                      alt="watch"
                      onClick={() => navigate("/product/"+item?._id)}
                    />
                  </div>
                  <div className="px-2 py-3">
                    <h5 className="title" onClick={() => navigate("/product/"+item?._id)}>{item?.title}</h5>
                    <h6 className="price">₹ {item?.price}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
