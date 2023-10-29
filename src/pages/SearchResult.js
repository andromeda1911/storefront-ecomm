import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import Container from "../components/Container";

const SearchResult = () => {
  const { state } = useLocation();
  return (
    <>
      <Meta title={"Search Results"}></Meta>
      <BreadCrumb title="Search Results" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row text-center">
          <ProductCard data={state ? state : []} grid={4} />
        </div>
      </Container>
    </>
  );
};

export default SearchResult;
