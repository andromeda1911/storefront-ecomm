import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  getUserCart,
  updateCartItem,
} from "../features/user/userSlice";
import { useEffect } from "react";

const Cart = () => {
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
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const cartState = useSelector((state) => state.auth.cartProducts);
  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartItem({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: Number(productUpdateDetail?.quantity),
          config2: config2
        })
      );
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 200);
    }
  }, [productUpdateDetail]);

  const deleteCartProduct = (cartItemId) => {
    dispatch(deleteCartItem({cartItemId: cartItemId, config2: config2}));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  };

  useEffect(() => { 
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity * cartState[index].price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  return (
    <>
      <Meta title={"Cart"}></Meta>
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        { cartState?.length != 0 && 
          <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              {/* <h4 className="cart-col-2">Price</h4> */}
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {cartState &&
              cartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 nb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-20">
                        <img
                          src={item.productId.images[0].url}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>
                      <div className="w-80">
                        <p>{item?.productId?.title}</p>
                        <p>Size: 23</p>
                        <p className="d-flex gap-3">
                          Color:{" "}
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    {/* <div className="cart-col-2">
                      <h5 className="price">₹ {item?.price}</h5>
                    </div> */}
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          name="quantity"
                          min={1}
                          max={10}
                          id={"cart"+item?._id}
                          value={item?.quantity
                          }
                          onChange={(e) => {
                            setProductUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteCartProduct(item?._id);
                          }}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        ₹ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline checkout-bottom-btn-container">
              {/* <Link to="/product" className="button">
                Continue to Shopping
              </Link> */}
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: ₹ {totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        }
        {
          (cartState?.length == 0 || cartState === undefined) && 
          <div className="fs-3 text-center py-5">Your cart is empty!</div>
        }
      </Container>
    </>
  );
};

export default Cart;
