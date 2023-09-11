import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg"
import wish from '../images/wish.svg'
import wishlist from '../images/wishlist.svg' 
import watch from '../images/watch.jpg'
import watch2 from '../images/watch2.jpg'
import addcart from '../images/add-cart.svg'
import view from '../images/view.svg'

const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  return (
    <div
      className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"} `}
    >
      <Link to={`${location.pathname=='/' ? '/product/:id': location.pathname == "/product/:id" ? "/product/:id" : ":id"}`} className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img src={wish} alt="wishlist" />
          </button>
        </div>
        <div className="product-image">
          <img src={watch} alt="product image" />
        </div>
        <div className="product-details">
          <h6 className="brand">Trader Joe's</h6>
          <h5 className="product-title">
            Kids headphones bulk 10 pack multi colored for students
          </h5>
          <ReactStars
            count={5}
            size={24}
            value={3}
            edit={false}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p className="price">₹999</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img src={view} alt="view" />
            </button>
            <button className="border-0 bg-transparent">
              <img src={prodcompare} alt="prodcompare" />
            </button>
            <button className="border-0 bg-transparent">
              <img src={addcart} alt="addcart" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
