import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Helmet } from "react-helmet";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllproducts } from "../features/products/productSlice";
import { useLocation } from "react-router-dom";
import {
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import { getTags } from "../features/tags/productTagSlice";
import { getBrands } from "../features/brand/brandSlice";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedMenuItem = location.search.split("=")[0];
  const selectedSubMenuItem = location.search.split("=")[1];
  const productState = useSelector((state) => state.product.product);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
    // dispatch(getTags());
    // dispatch(getBrands());
  }, []);
  // const productCategories = useSelector((state) => state?.pCategory?.categories);
  // const prodTag = useSelector((state) => state?.productTag?.tags);
  // const brandState = useSelector((state) => state.brand.brands);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(false);
  const [selectedProductTag, setSelectedProductTag] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      if (element.tags !== undefined) {
        newtags.push(element.tags);
      }
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newtags);
  }, [productState]);

  useEffect(() => {
    selectedMenuItem.includes("c")
      ? setCategory(selectedSubMenuItem)
      : setTag(selectedSubMenuItem);
    // if (selectedTag !== undefined) {
    //   setTag(selectedTag);
    // }
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(
      getAllproducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  return (
    <>
      <Meta title={"Our Store"}></Meta>
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="d-none d-md-block col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="cursor-pointer"
                          onClick={() => setCategory(item)}
                        >
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                {/* <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id=""
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock (0)
                    </label>
                  </div>
                </div> */}
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="To"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div className="d-flex flex-wrap">
                  <Color />
                </div> */}
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {tags &&
                    [...new Set(tags)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            selectedProductTag ? setTag([]) : setTag(item);
                            selectedProductTag
                              ? setSelectedProductTag(false)
                              : setSelectedProductTag(true);
                          }}
                          className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer position-relative"
                        >
                          {item}
                          {selectedProductTag && (
                            <span className="position-absolute deselect-filter">
                              x
                            </span>
                          )}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {brands &&
                    [...new Set(brands)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            console.log(
                              "is brand selected==========",
                              selectedBrand
                            );

                            selectedBrand ? setBrand([]) : setBrand(item);
                            selectedBrand
                              ? setSelectedBrand(false)
                              : setSelectedBrand(true);
                          }}
                          className={
                            "text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer position-relative"
                          }
                        >
                          {item}
                          {selectedBrand && (
                            <span className="position-absolute deselect-filter">
                              x
                            </span>
                          )}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="filter-cort-grid mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <div className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </div>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-item-center gap-10">
                  {/* <p className="totalproducts mb-0">21 products</p> */}
                  <div className="d-flex gap-10 align-items-center grid d-none d-md-flex">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt=""
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt=""
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            
            
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap  gap-mobile-0">
                <div className="mobile-filters py-3 d-md-none">
                  <div className="mobile-filter-container">
                    <span onClick={() => setShowMobileFilters(!showMobileFilters)}>FILTERS</span>
                    {
              showMobileFilters && 
              <div className="mobile-filters-body">
                <div className="col-12">
            <div className="filter-card">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="cursor-pointer"
                          onClick={() => setCategory(item)}
                        >
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card">
              <h3 className="filter-title">Filter By</h3>
              <div>
                {/* <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id=""
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock (0)
                    </label>
                  </div>
                </div> */}
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="To"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div className="d-flex flex-wrap">
                  <Color />
                </div> */}
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {tags &&
                    [...new Set(tags)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            selectedProductTag ? setTag([]) : setTag(item);
                            selectedProductTag
                              ? setSelectedProductTag(false)
                              : setSelectedProductTag(true);
                          }}
                          className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer position-relative"
                        >
                          {item}
                          {selectedProductTag && (
                            <span className="position-absolute deselect-filter">
                              x
                            </span>
                          )}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="filter-card">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {brands &&
                    [...new Set(brands)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            console.log(
                              "is brand selected==========",
                              selectedBrand
                            );

                            selectedBrand ? setBrand([]) : setBrand(item);
                            selectedBrand
                              ? setSelectedBrand(false)
                              : setSelectedBrand(true);
                          }}
                          className={
                            "text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer position-relative"
                          }
                        >
                          {item}
                          {selectedBrand && (
                            <span className="position-absolute deselect-filter">
                              x
                            </span>
                          )}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
              </div>
            }
                  </div>
                </div>
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
