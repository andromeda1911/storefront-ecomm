import React from "react";

const Color = (props) => {
  const {colorData, setColor} = props;
  return (
    <>
      <ul className="colors ps-0">
        {
          colorData && colorData.map((item, index) => {
            return (
                <li onClick={()=>{
                  setColor(item?._id)
                  console.log('set color', item?._id, item);
                }} style={{backgroundColor: item?.title}} key={index}></li>
            )
          })
        }
        
        
      </ul>
    </>
  );
};

export default Color;
