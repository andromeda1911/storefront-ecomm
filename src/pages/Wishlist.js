import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistItems();
  }, []);
  const getWishlistItems = () => {
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state.auth.user.wishlist);
  console.log('wish', wishlistState);
  console.log(getWishlistItems);
  return (
    <>
      <Meta title={"Wishlist"}></Meta>
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <div
                  className="wishlist-card position-relative
              "
                >
                  <img
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image">
                    <img
                      src={item?.images[0]?.url ? item?.images[0].url : "images/watch.jpg"}
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </div>
                  <div className="px-2 py-3">
                    <h5 className="title">{item?.title}</h5>
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
