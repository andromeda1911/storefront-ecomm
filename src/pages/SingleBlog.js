import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getblogDetails } from "../features/blogs/blogSlice";


const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  useEffect(() => {
    getDetails(getBlogId);
  }, []);
  const getDetails = () => {
    dispatch(getblogDetails(getBlogId));
  };
  return (
    <>
      <Meta title={blogState?.title}></Meta>
      <BreadCrumb title={blogState?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blog" className="d-flex align-items-center gap-10">
                {" "}
                <HiOutlineArrowLeft className="fs-4" />
                Go back to blogs
              </Link>
              <h3 className="title">{blogState?.title}</h3>
              <img src={blogState.images?.url ? blogState.images[0].url : blog} className="img-fluid w-100 my-4" alt="blog" />
              <p dangerouslySetInnerHTML={{ __html: blogState?.description}}>
                
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
