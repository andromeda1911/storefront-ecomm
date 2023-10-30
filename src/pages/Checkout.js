import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createCustomerOrder, emptyUserCart, getUserCart, resetState } from "../features/user/userSlice";
import Loader from "../components/Loader";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("pincode is required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [loader, setLoader] = useState(false);
  // const [paymentInfo, setPaymentInfo] = useState({
  //   razorpayPaymentId: "",
  //   razorpayOrderId: "",
  // });
  const [cartProductState, setcartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity * cartState[index].price);
      setTotalAmount(sum);
    }
  }, [cartState]);

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
    if (
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate("/my-orders");
    }
  }, [authState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit:  (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkoutHandler();
      }, 300);
    },
  });
  console.log("vals-------", shippingInfo);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      setLoader(false);

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      console.log("checkout cartstate", cartState[index]);
      items.push({
        product: cartState[index].productId?._id,
        quantity: cartState[index]?.quantity,
        color: cartState[index]?.productId?.color[0],
        price: cartState[index]?.price,
      });
    }
    setcartProductState(items);
  }, [cartState]);

  const checkoutHandler = async () => {
    setLoader(true);
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      setLoader(false);
      alert("razorpay SDK failed to load");
      return;
    }
    const result = await axios.post(
      // "http://localhost:5000/api/user/order/checkout",
      "https://storefront-app-402010.el.r.appspot.com/api/user/order/checkout",
      { amount: totalAmount + 29 },
      config2
    );
    if (!result) {
      setLoader(false);
      alert("Something went wrong");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;
    setLoader(false);
    const options = {
      key: "rzp_test_aYxE5RcfDbj9qY", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Peacock Boutique",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          // "http://localhost:5000/api/user/order/paymentVerification",
          "https://storefront-app-402010.el.r.appspot.com/api/user/order/paymentVerification",
          data,
          config2
        );

        console.log("resulkt value", result.data.razorpayPaymentId);

        // setPaymentInfo({
        //   razorpayPaymentId: result.data.razorpayPaymentId,
        //   razorpayOrderId: result.data.razorpayOrderId,
        // });
        // console.log('paymentinfo=========', paymentInfo);
        dispatch(
          createCustomerOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: result.data,
            shippingInfo:JSON.parse(localStorage.getItem("address")),
            config2: config2
          })
        );
        dispatch(emptyUserCart(config2))
        localStorage.removeItem("address");
        dispatch(resetState())
      },
      prefill: {
        name: "Nikhil Sridhar",
        email: "gemnik94@gmail.com",
        contact: "8606684944",
      },
      notes: {
        address: "Peacock Boutique",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
     <Loader data={loader} />
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Storefront</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">Nikhil (gemnik94@gmail.com)</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    value={formik.values.country}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    value={formik.values.firstName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc."
                    className="form-control"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    value={formik.values.other}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    value={formik.values.city}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <select
                    className="form-control form-select"
                    id=""
                    name="state"
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    value={formik.values.state}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Kerala">Kerala</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name="pincode"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                    value={formik.values.pincode}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" /> Return to Cart
                    </Link>
                    {/* <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link> */}
                    <button className="button mobile-place-order-btn" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          {/* <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span> */}
                          <img
                            width={100}
                            height={100}
                            src={item?.productId?.images[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title}
                          </h5>
                          <p className="total-price">{item?.color?.title}</p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          ₹ {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  ₹ {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">₹ 29</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                ₹ {totalAmount ? totalAmount + 29 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
