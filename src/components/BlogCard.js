import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const {id, title, description, image, time} = props;
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={props.image? props.image : "/images/blog-1.jpg"} className="img-fluid w-100" alt="" />
      </div>
      <div className="blog-content">
        <p className="date">{time}</p>
        <h5 className="title">{title}</h5>
        <p className="desc" dangerouslySetInnerHTML={{ __html: description?.substr(0, 70) + "..." }}>
        
        </p>
        <Link to={`/blog/${id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
