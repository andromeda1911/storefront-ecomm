import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = (props) => {
    const { data } = props;
  return (
    <>
      <ColorRing
        visible={data}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
      />
    </>
  );
};

export default Loader;
